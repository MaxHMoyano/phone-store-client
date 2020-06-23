import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { newsService } from '../../redux/services/newsService';
import { fetchNews } from '../../redux/slices/newsSlice';

const CreateNews = (props) => {
  const dispatch = useDispatch();

  const [isDesktopUploaded, setIsDesktopUploaded] = useState<boolean>(false);
  const [desktopUrl, setDesktopUrl] = useState<string>('initialState');
  const [isMobileUploaded, setIsMobileUploaded] = useState<boolean>(false);
  const [mobileUrl, setMobileUrl] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const uploadPhotos = async (): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
      try {
        // Subo la foto
        setIsSubmitting(true);
        let desktopFiles: FileList = (document.getElementById(
          'image-file-upload-desktop'
        ) as HTMLInputElement).files;
        let mobileFiles: FileList = (document.getElementById(
          'image-file-upload-mobile'
        ) as HTMLInputElement).files;
        if (desktopFiles.length && mobileFiles.length) {
          let firstFormData = new FormData();
          firstFormData.append('img_desktop', desktopFiles[0]);
          let firstPart = await newsService.createNews(firstFormData);
          let secondPartFormData = new FormData();
          secondPartFormData.append('img_mobile', mobileFiles[0]);
          await newsService.updateNews(firstPart.id, secondPartFormData);
          await dispatch(fetchNews());
          setIsSubmitting(false);
          props.onHide();
          resetForm();
          resolve();
        }
        reject();
      } catch (error) {
        setIsSubmitting(false);
        reject();
      }
    });
  };

  const resetForm = () => {
    setIsDesktopUploaded(false);
    setIsMobileUploaded(false);
    setMobileUrl('');
    setDesktopUrl('');
  };

  const handleImageChangeDesktop = (e) => {
    let files = e.target.files as FileList;
    if (files.length) {
      setIsDesktopUploaded(true);
      setDesktopUrl(URL.createObjectURL(files[0]));
    }
  };
  const handleImageChangeMobile = (e) => {
    let files = e.target.files as FileList;
    if (files.length) {
      setIsMobileUploaded(true);
      setMobileUrl(URL.createObjectURL(files[0]));
    }
  };

  const handleSubmit = async (e) => {
    try {
      await uploadPhotos();
    } catch (error) {}
  };

  const handleCloseModal = () => {
    props.onHide();
  };

  return (
    <Fragment>
      <Modal onHide={props.onHide} show={props.show} size={'xl'} centered>
        <Modal.Header closeButton>
          <Modal.Title>Nuevo articulo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            {/* Left part - only image */}
            <Col
              className={
                'd-flex align-items-center justify-content-center flex-column'
              }
            >
              <Fragment>
                <h3>Imagen para escritorio</h3>
                {isDesktopUploaded && (
                  <img
                    style={{ width: '50%', marginBottom: '2rem' }}
                    src={desktopUrl}
                    alt=''
                  />
                )}
                <Button
                  onClick={(e) =>
                    document.getElementById('image-file-upload-desktop').click()
                  }
                >
                  {!isDesktopUploaded ? (
                    <i className='fas fa-upload'></i>
                  ) : (
                    <span>Cambiar imagen</span>
                  )}
                </Button>
                {!isDesktopUploaded && (
                  <span className={'mt-2'}>Subir imagen</span>
                )}
              </Fragment>

              <input
                onChange={handleImageChangeDesktop}
                type={'file'}
                id={'image-file-upload-desktop'}
                hidden
              />
            </Col>
            {/* Right part - only image */}
            <Col
              className={
                'd-flex align-items-center justify-content-center flex-column'
              }
            >
              <Fragment>
                <h3>Imagen para celulares</h3>
                {isMobileUploaded && (
                  <img
                    style={{ width: '50%', marginBottom: '2rem' }}
                    src={mobileUrl}
                    alt=''
                  />
                )}
                <Button
                  onClick={(e) =>
                    document.getElementById('image-file-upload-mobile').click()
                  }
                >
                  {!isMobileUploaded ? (
                    <i className='fas fa-upload'></i>
                  ) : (
                    <span>Cambiar imagen</span>
                  )}
                </Button>
                {!isMobileUploaded && (
                  <span className={'mt-2'}>Subir imagen</span>
                )}
              </Fragment>

              <input
                onChange={handleImageChangeMobile}
                type={'file'}
                id={'image-file-upload-mobile'}
                hidden
              />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button
            disabled={isSubmitting}
            variant={'light'}
            onClick={handleCloseModal}
          >
            Cancelar
          </Button>
          <Button
            disabled={isSubmitting || !isDesktopUploaded || !isMobileUploaded}
            onClick={handleSubmit}
            variant={'primary'}
            type={'submit'}
          >
            {isSubmitting ? (
              <i className='fas fa-spinner fa-spin'></i>
            ) : (
              <span>Agregar</span>
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

CreateNews.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};

export default CreateNews;
