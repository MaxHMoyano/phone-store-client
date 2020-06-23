import React, { Fragment, useState } from 'react';
import { Modal, Button, Table, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Category } from '../../models/Shared';
import { categoriesService } from '../../redux/services/categoriesService';
import {
  selectCategories,
  selectedCategoriesPendingState,
  fetchCategories,
} from '../../redux/slices/categoriesSlice';
import { useSelector, useDispatch } from 'react-redux';

const CategoriesModal = (props) => {
  // dispatch const
  const dispatch = useDispatch();

  // Selectors
  const categories = useSelector(selectCategories);
  const isPending = useSelector(selectedCategoriesPendingState);

  const handleCloseModal = () => {
    props.onHide();
  };

  const [newCategory, setNewCategory] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);

  const deleteCategory = async (category: Category) => {
    setSubmitting(true);
    await categoriesService.deleteCategory(category.id);
    await dispatch(fetchCategories());
    setSubmitting(false);
  };
  const createCategory = async () => {
    if (newCategory) {
      let category: Category = {
        name: newCategory,
      };
      setSubmitting(true);
      await categoriesService.createCategory(category);
      await dispatch(fetchCategories());
      setNewCategory('');
      setSubmitting(false);
    }
  };
  return (
    <Fragment>
      <Modal onHide={props.onHide} show={props.show} size={'lg'} centered>
        <Modal.Header closeButton>
          <Modal.Title>Administrar categorias</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: '70vh', overflowY: 'auto' }}>
          <p>Lista de categorias disponibles</p>
          <div className='d-flex justify-content-center align-items-center'>
            {isPending ? (
              <i className={'fas fa-spin fa-spinner fa-2x'}></i>
            ) : (
              <Table>
                <thead>
                  <tr>
                    <th style={{ width: '80%' }}>Nombre</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category, idx) => (
                    <tr key={idx}>
                      <td>{category.name}</td>
                      <td>
                        <Button
                          disabled={submitting}
                          variant={'danger'}
                          onClick={(e) => deleteCategory(category)}
                        >
                          {submitting ? (
                            <i className={'fas fa-spin fa-spinner'}></i>
                          ) : (
                            <i className='fas fa-times'></i>
                          )}
                        </Button>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td>
                      <Form.Control
                        placeholder={'Agregar nueva categoria'}
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                      />
                    </td>
                    <td>
                      <Button
                        variant={'success'}
                        disabled={submitting}
                        onClick={(e) => createCategory()}
                      >
                        {submitting ? (
                          <i className={'fas fa-spin fa-spinner'}></i>
                        ) : (
                          <i className='fas fa-check'></i>
                        )}
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </Table>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant={'light'} onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant={'primary'} onClick={handleCloseModal}>
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

CategoriesModal.propTypes = {
  onHide: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

export default CategoriesModal;
