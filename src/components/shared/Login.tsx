import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { logUser } from '../../redux/slices/userSlice';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

const Login = (props) => {
  const dispatch = useDispatch();

  // login schema
  const loginSchema = yup.object().shape({
    email: yup
      .string()
      .required('El email es requerido')
      .email('Ingrese un email valido'),
    password: yup.string().required('La contraseña es requerida'),
  });
  // formik object
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      await dispatch(logUser(values.email, values.password));
      setSubmitting(false);
      resetForm();
      props.onHide();
    },
  });

  return (
    <Modal {...props} size='sm' centered>
      <Form autoComplete={'off'} onSubmit={formik.handleSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Usuario *</Form.Label>
            <Form.Control
              name={'email'}
              type={'text'}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isValid={!formik.errors.email && formik.touched.email}
              isInvalid={formik.errors.email && formik.touched.email}
            />

            <Form.Control.Feedback type='invalid'>
              {formik.errors.email}
            </Form.Control.Feedback>
            <Form.Control.Feedback type='valid'>
              Perfecto!
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Contraseña *</Form.Label>
            <Form.Control
              name={'password'}
              type={'password'}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isValid={!formik.errors.password && formik.touched.password}
              isInvalid={formik.errors.password && formik.touched.password}
            />

            <Form.Control.Feedback type='invalid'>
              {formik.errors.password}
            </Form.Control.Feedback>
            <Form.Control.Feedback type='valid'>
              Se ve bien!
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type={'submit'}
            disabled={formik.isSubmitting || !formik.isValid}>
            {formik.isSubmitting ? (
              <i className='fas fa-spinner fa-spin'></i>
            ) : (
              <span>Iniciar Sesión</span>
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

Login.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};

export default Login;
