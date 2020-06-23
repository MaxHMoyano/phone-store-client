import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  Button,
  Form,
  Row,
  Col,
  OverlayTrigger,
  Tooltip,
  Table,
  InputGroup,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Article, Subarticle } from '../../models/Shared';
import { articlesService } from '../../redux/services/articlesService';
import { selectCategories } from '../../redux/slices/categoriesSlice';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select';
import { fetchArticles } from '../../redux/slices/articlesSlice';
import { categoriesService } from '../../redux/services/categoriesService';
import { create } from 'domain';
import CategoriesModal from './CategoriesModal';

const CreateArticle = (props) => {
  const dispatch = useDispatch();

  const categories = useSelector(selectCategories);

  const [isPhotoUploaded, setIsPhotoUploaded] = useState(false);
  const [photoUrl, setPhotoUrl] = useState('');
  const [showManageCategoriesModal, setShowManageCategoriesModal] = useState<
    boolean
  >(false);

  const articleScheme = yup.object<Article>().shape({
    name: yup.string().required('El nombre es requerido'),
    description: yup.string(),
    active: yup.boolean(),
    basePrice: yup.number(),
    category: yup
      .object()
      .shape({
        label: yup.string(),
        value: yup.string(),
      })
      .nullable(),
    subarticles: yup.array(
      yup.object().shape({
        name: yup.string(),
        price: yup.number(),
        active: yup.boolean(),
        id: yup.string().nullable(),
      })
    ),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      active: true,
      basePrice: 0,
      category: null,
      subarticles: [],
    },
    validationSchema: articleScheme,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        setSubmitting(true);
        // Creo el articulo
        let article: Article = {
          id: props.articleId,
          name: values.name,
          description: values.description,
          active: values.active,
          category: values.category.value,
        };

        if (!props.articleId) {
          let createdArticle = await articlesService.createArticle(article);
          // Creo los sub articulos
          let articleItems: Subarticle[] = values.subarticles.map((item) => ({
            name: `${createdArticle.name} (${item.name})`,
            price: item.price,
            active: item.active,
          }));
          await articlesService.createSubarticles(
            createdArticle.id,
            articleItems
          );
          await uploadPhoto(createdArticle.id);
        } else {
          await articlesService.updateArticle(article);
          await uploadPhoto(article.id);
          formik.values.subarticles.forEach(async (subarticle: Subarticle) => {
            console.log('for each');
            await articlesService.updateSubarticle({
              ...subarticle,
              name: `${article.name} (${subarticle.name})`,
            });
          });
        }
        setSubmitting(false);
        await dispatch(fetchArticles());
        props.onHide();
      } catch (error) {
        console.error(error);
      }
    },
  });

  const uploadPhoto = async (articleId): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
      // Subo la foto
      let files: FileList = (document.getElementById(
        'image-file-upload'
      ) as HTMLInputElement).files;
      if (files.length) {
        await articlesService.uploadArticlePhoto(articleId, files[0]);
        resolve(true);
      } else if (isPhotoUploaded) {
        resolve(true);
      } else {
        reject();
      }
    });
  };

  useEffect(() => {
    if (props.articleId) {
      articlesService.getArticle(props.articleId).then(async (article) => {
        let category = await categoriesService.getCategory(article.category);
        setPhotoUrl(article.photo);
        setIsPhotoUploaded(true);
        formik.setValues({
          name: article.name,
          description: article.description,
          active: article.active,
          subarticles: article.subarticles.map((subarticle) => ({
            ...subarticle,
            name: subarticle.name.split('(')[1].replace(/([()])/g, ''),
          })),
          basePrice: article.subarticles.length
            ? article.subarticles[0].price
            : 0,
          category: {
            label: category.name,
            value: category.id,
          },
        });
      });
    }
  }, [props.articleId]);

  const addArticleItem = (e) => {
    formik.setFieldValue('subarticles', [
      ...formik.values.subarticles,
      {
        name: '',
        price: formik.values.basePrice,
        active: formik.values.active,
        id: null,
      },
    ]);
  };

  const handleImageChange = (e) => {
    let files = e.target.files as FileList;
    if (files.length) {
      setIsPhotoUploaded(true);
      setPhotoUrl(URL.createObjectURL(files[0]));
    }
  };

  const handleDeletedItem = (idx) => {};

  const handleCloseModal = () => {
    props.onHide();
    formik.resetForm();
  };

  return (
    <Fragment>
      <CategoriesModal
        show={showManageCategoriesModal}
        onHide={(e) => setShowManageCategoriesModal(false)}
      />
      <Modal onHide={props.onHide} show={props.show} size={'xl'} centered>
        {/* {JSON.stringify(formik.errors)} */}
        <Form autoComplete={'off'} onSubmit={formik.handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Nuevo articulo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              {/* Left part */}
              <Col style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>Nombre *</Form.Label>
                      <Form.Control
                        name={'name'}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={formik.errors.name && formik.touched.name}
                        value={formik.values.name}
                      />
                      <Form.Control.Feedback type={'invalid'}>
                        {formik.errors.name}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>Descripción</Form.Label>
                      <Form.Control
                        name={'description'}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.description}
                        as={'textarea'}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>Categoria</Form.Label>
                      <Select
                        value={formik.values.category}
                        options={categories.map((category) => ({
                          label: category.name,
                          value: category.id,
                        }))}
                        placeholder={'Seleccionar...'}
                        onChange={(value) =>
                          formik.setFieldValue('category', value)
                        }
                      />
                      <Form.Text>
                        El usuario podra encontrar este producto si filtra por
                        esta categoria
                      </Form.Text>
                    </Form.Group>
                  </Col>
                  <Col md={2} className={'d-flex align-items-center'}>
                    <OverlayTrigger
                      placement={'bottom'}
                      overlay={
                        <Tooltip id={'tooltip-us'}>
                          Administrar categorias
                        </Tooltip>
                      }
                    >
                      <Button
                        variant='info'
                        onClick={(e) => setShowManageCategoriesModal(true)}
                      >
                        <i className='fas fa-tasks'></i>
                      </Button>
                    </OverlayTrigger>
                  </Col>
                </Row>
                <Row className={'mt-2'}>
                  <Col>
                    <InputGroup className='mb-2'>
                      <InputGroup.Prepend>
                        <InputGroup.Text>$</InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        name={'basePrice'}
                        type={'number'}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.basePrice}
                      />
                    </InputGroup>

                    <Form.Text>Precio base del producto</Form.Text>
                  </Col>
                </Row>
                <Row className={'mt-2'}>
                  <Col md={2}>
                    <OverlayTrigger
                      placement={'bottom'}
                      overlay={
                        <Tooltip id={'tooltip-article'}>
                          Agregar variación
                        </Tooltip>
                      }
                    >
                      <Button variant={'dark'} onClick={addArticleItem}>
                        <i className='fas fa-plus'></i>
                      </Button>
                    </OverlayTrigger>
                  </Col>
                  <Col
                    className={'d-flex align-items-center justify-content-end'}
                  >
                    <Form.Check
                      custom
                      type={'checkbox'}
                      id={`custom-active-checkbox`}
                      label={`¿Hay stock?`}
                      checked={formik.values.active}
                      onChange={formik.handleChange}
                      name={'active'}
                    />
                  </Col>
                </Row>

                <Row className={'mt-2'}>
                  <Col>
                    <Table>
                      <thead>
                        <tr>
                          <th>Nombre</th>
                          <th>Precio ($ ARS)</th>
                          <th>¿Stock?</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {formik.values.subarticles.map((item, idx) => (
                          <tr key={idx}>
                            <td>
                              <Form.Control
                                value={item.name}
                                onChange={(e) =>
                                  formik.setFieldValue(
                                    `subarticles[${idx}].name`,
                                    e.target.value
                                  )
                                }
                              />
                            </td>
                            <td>
                              <Form.Control
                                value={item.price}
                                type={'number'}
                                onChange={(e) =>
                                  formik.setFieldValue(
                                    `subarticles[${idx}].price`,
                                    e.target.value
                                  )
                                }
                              />
                            </td>
                            <td
                              style={{
                                verticalAlign: 'middle',
                                textAlign: 'center',
                              }}
                            >
                              <Form.Check
                                custom
                                type={'checkbox'}
                                id={`article-active-checkbox-${idx}`}
                                checked={item.active}
                                label={''}
                                onChange={(e) =>
                                  formik.setFieldValue(
                                    `subarticles[${idx}].active`,
                                    !item.active
                                  )
                                }
                              />
                            </td>
                            <td>
                              <Button
                                variant={'danger'}
                                onClick={(e) => handleDeletedItem(idx)}
                              >
                                <i className='fas fa-times'></i>
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Col>
                </Row>
              </Col>
              {/* Right part - only image */}
              <Col
                className={
                  'd-flex align-items-center justify-content-center flex-column'
                }
              >
                <Fragment>
                  {isPhotoUploaded && (
                    <img
                      style={{ width: '50%', marginBottom: '2rem' }}
                      src={photoUrl}
                      alt=''
                    />
                  )}
                  <Button
                    onClick={(e) =>
                      document.getElementById('image-file-upload').click()
                    }
                  >
                    {!isPhotoUploaded ? (
                      <i className='fas fa-upload'></i>
                    ) : (
                      <span>Cambiar imagen</span>
                    )}
                  </Button>
                  {!isPhotoUploaded && (
                    <span className={'mt-2'}>Subir imagen</span>
                  )}
                </Fragment>

                <input
                  onChange={handleImageChange}
                  type={'file'}
                  id={'image-file-upload'}
                  hidden
                />
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button
              disabled={formik.isSubmitting}
              variant={'light'}
              onClick={handleCloseModal}
            >
              Cancelar
            </Button>
            <Button
              disabled={formik.isSubmitting}
              variant={'primary'}
              type={'submit'}
            >
              {formik.isSubmitting ? (
                <i className='fas fa-spinner fa-spin'></i>
              ) : (
                <span>Agregar</span>
              )}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Fragment>
  );
};

CreateArticle.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  articleId: PropTypes.string,
};

export default CreateArticle;
