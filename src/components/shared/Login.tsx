import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
const Login = (props) => {
  return (
    <Modal {...props} size='sm' centered>
      {/* <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          Iniciar Sesión
        </Modal.Title>
      </Modal.Header> */}
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Usuario *</Form.Label>
            <Form.Control />
          </Form.Group>
          <Form.Group>
            <Form.Label>Contraseña *</Form.Label>
            <Form.Control />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {/* <Button onClick={props.onHide}>Cancelar</Button> */}
        <Button onClick={props.onHide}>Iniciar Sesión</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Login;
