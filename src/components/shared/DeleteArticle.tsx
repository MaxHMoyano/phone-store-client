import React, { Fragment, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { articlesService } from '../../redux/services/articlesService';
import { fetchArticles } from '../../redux/slices/articlesSlice';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

const DeleteArticle = (props) => {
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    props.onHide();
  };

  const [submitting, setSubmitting] = useState(false);

  const deleteArticle = async () => {
    setSubmitting(true);
    await articlesService.deleteArticle(props.articleId);
    await dispatch(fetchArticles());
    props.onHide();
    setSubmitting(false);
  };

  return (
    <Fragment>
      <Modal onHide={props.onHide} show={props.show} size={'sm'} centered>
        <Modal.Header closeButton>
          <Modal.Title>Borrar articulo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>¿Estas seguro que quieres borrar este articulo?</p>
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
            onClick={(e) => deleteArticle()}
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

DeleteArticle.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  articleId: PropTypes.string.isRequired,
};

export default DeleteArticle;
