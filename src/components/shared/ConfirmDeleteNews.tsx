import React, { Fragment, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchNews } from '../../redux/slices/newsSlice';
import { newsService } from '../../redux/services/newsService';

const DeleteNewsConfirm = (props) => {
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    props.onHide();
  };

  const [submitting, setSubmitting] = useState(false);

  const deleteNews = async () => {
    setSubmitting(true);
    await newsService.deleteNews(props.newsId);
    await dispatch(fetchNews());
    setSubmitting(false);
    props.onHide();
  };

  return (
    <Fragment>
      <Modal onHide={props.onHide} show={props.show} size={'sm'} centered>
        <Modal.Header closeButton>
          <Modal.Title>Borrar novedades</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>¿Estas seguro que quieres borrar esta novedad?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            disabled={submitting}
            variant={'light'}
            onClick={handleCloseModal}
          >
            Cancelar
          </Button>
          <Button
            disabled={submitting}
            variant={'danger'}
            onClick={(e) => deleteNews()}
          >
            {submitting ? (
              <i className='fas fa-spinner fa-spin'></i>
            ) : (
              <span>Borrar</span>
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

DeleteNewsConfirm.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  newsId: PropTypes.string.isRequired,
};

export default DeleteNewsConfirm;
