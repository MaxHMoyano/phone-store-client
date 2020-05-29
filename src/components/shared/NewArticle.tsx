import React, { Fragment } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

const NewArticle = (props) => {
  return (
    <Fragment>
      <Modal {...props} size={'lg'} centered>
        <Modal.Header closeButton>
          <Modal.Title>Nuevo articulo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Nombre *</Form.Label>
                    <Form.Control />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Precio base*</Form.Label>
                    <Form.Control />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control as={'textarea'} />
                  </Form.Group>
                </Col>
              </Row>
            </Col>
            <Col
              className={
                'd-flex align-items-center justify-content-center flex-column'
              }
            >
              <Button
                onClick={(e) =>
                  document.getElementById('image-file-upload').click()
                }
              >
                <i className='fas fa-upload'></i>
              </Button>
              <span className={'mt-2'}>Subir imagen</span>
              <input type={'file'} id={'image-file-upload'} hidden />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant={'light'} onClick={props.onHide}>
            Cancelar
          </Button>
          <Button variant={'primary'}>Agregar</Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default NewArticle;
