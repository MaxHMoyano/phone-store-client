import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Badge, Button } from 'react-bootstrap';
import Login from '../shared/Login';
import CreateArticle from '../shared/CreateArticle';
import { useSelector, useDispatch } from 'react-redux';
import { selectTransactionCount } from '../../redux/slices/TransactionsSlice';
import { userLoggedInState, userSlice } from '../../redux/slices/userSlice';
import Transactions from '../shared/Transactions';

const Profile = (props) => {
  // dispatch constant
  const dispatch = useDispatch();

  // Selectors
  const transactionsCount = useSelector(selectTransactionCount);
  const isUserLoggedIn = useSelector(userLoggedInState);

  // local state
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showCreateArticleModal, setShowCreateArticleModal] = useState(false);
  const [showTransactionsModal, setShowTransactionsModal] = useState(false);

  return (
    <Fragment>
      <Login show={showLoginModal} onHide={(e) => setShowLoginModal(false)} />
      <CreateArticle
        show={showCreateArticleModal}
        onHide={(e) => setShowCreateArticleModal(false)}
      />
      <Transactions
        show={showTransactionsModal}
        onHide={(e) => setShowTransactionsModal(false)}
      />
      <div className='profile'>
        {isUserLoggedIn ? (
          <Dropdown>
            <Dropdown.Toggle variant='primary' id='profile-dropdown'>
              <i className='fas fa-user'></i>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                onClick={(e) => setShowCreateArticleModal(true)}
                className='p-3 d-flex align-items-center justify-content-between'
              >
                Agregar articulo
                <i className='fas fa-plus ml-3'></i>
              </Dropdown.Item>
              <Dropdown.Item
                onClick={(e) => setShowTransactionsModal(true)}
                className='p-3 d-flex align-items-center justify-content-between'
              >
                Compras pendientes
                <Badge variant='info' className='ml-3'>
                  {transactionsCount}
                </Badge>
              </Dropdown.Item>
              <Dropdown.Item
                onClick={(e) => dispatch(userSlice.actions.logout())}
                className='p-3 d-flex align-items-center justify-content-between'
              >
                Cerrar Sesión
                <i className='fas fa-sign-out-alt ml-3'></i>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <Button variant='light' onClick={(e) => setShowLoginModal(true)}>
            Iniciar Sesión
          </Button>
        )}
      </div>
    </Fragment>
  );
};

Profile.propTypes = {};

export default Profile;
