import React, { useEffect, Fragment, useState } from 'react';
import { Button, Badge, Dropdown } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import {
  shoppingCartSlice,
  shoppingCartArticlesCountSelector,
} from '../../redux/slices/shoppingCartSlice';
import { selectCategories } from '../../redux/slices/categoriesSlice';
import { isMobileOnly } from 'react-device-detect';
import Login from '../../components/shared/Login';
import { NavLink } from 'react-router-dom';
import NewArticle from '../shared/NewArticle';

// Component
const Navbar = () => {
  const dispatch = useDispatch();

  const pendingCount = useSelector(shoppingCartArticlesCountSelector);
  const categories = useSelector(selectCategories);

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showNewArticle, setShowNewArticle] = useState(false);

  useEffect(() => {
    document
      .querySelectorAll('#categories-dropdown, #profile-dropdown')
      .forEach((e) => {
        e.classList.remove('dropdown-toggle');
      });
  }, []);

  return (
    <Fragment>
      <Login show={showLoginModal} onHide={(e) => setShowLoginModal(false)} />
      <NewArticle
        show={showNewArticle}
        onHide={(e) => setShowNewArticle(false)}
      />
      <header className='main_header'>
        <div className='brand'>
          <Dropdown>
            <Dropdown.Toggle variant='primary' id='categories-dropdown'>
              {!isMobileOnly ? (
                <Fragment>
                  <span>Categorias</span>
                  <i className='fas fa-caret-down ml-2'></i>
                </Fragment>
              ) : (
                <Fragment>
                  <i className='fas fa-bars'></i>
                </Fragment>
              )}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {categories.map((category, idx) => (
                <Dropdown.Item key={idx} href='#/action-1'>
                  {category.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className='actions ml-5'>
          <Fragment>
            <NavLink to='/home'>
              <Button
                variant='light'
                className='mx-2 navbar_button navbar_home'
              >
                <i className='fas fa-home'></i>
              </Button>
            </NavLink>
            <NavLink to='/map'>
              <Button
                variant='light'
                className='mx-2 navbar_button navbar_home'
              >
                <i className='fas fa-map-marked'></i>
              </Button>
            </NavLink>
            <Button variant='light' className='mx-2 navbar_button'>
              <i className='fas fa-share-alt'></i>
            </Button>
            <Button
              variant='light'
              className='mx-2 navbar_button'
              onClick={(e) =>
                dispatch(shoppingCartSlice.actions.toggleShoppingCart())
              }
            >
              <i className='fas fa-shopping-cart'></i>
            </Button>
            <Badge
              variant='primary'
              style={{
                position: 'relative',
                right: '1.5rem',
                bottom: '.75rem',
              }}
            >
              {pendingCount}
            </Badge>
          </Fragment>
        </div>
        <div className='profile'>
          {/* <Button variant='light' onClick={(e) => setShowLoginModal(true)}>
            Iniciar Sesión
          </Button> */}
          <Dropdown>
            <Dropdown.Toggle variant='primary' id='profile-dropdown'>
              <i className='fas fa-user'></i>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                onClick={(e) => setShowNewArticle(true)}
                className='p-3 d-flex align-items-center justify-content-between'
              >
                Agregar articulo
                <i className='fas fa-plus ml-3'></i>
              </Dropdown.Item>
              <Dropdown.Item className='p-3 d-flex align-items-center justify-content-between'>
                Compras pendientes
                <Badge variant='info' className='ml-3'>
                  3
                </Badge>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </header>
    </Fragment>
  );
};

export default Navbar;
