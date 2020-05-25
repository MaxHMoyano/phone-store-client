import React, { useState, useEffect } from 'react';
import Logo from '../../assets/brand.jpg';
import { Button, Badge, Dropdown } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import {
  shoppingCartSlice,
  shoppingCartArticlesCountSelector,
} from '../../redux/slices/shoppingCartSlice';

const Navbar = () => {
  const dispatch = useDispatch();

  const pendingCount = useSelector(shoppingCartArticlesCountSelector);

  useEffect(() => {
    document
      .getElementById('dropdown-basic')
      .classList.remove('dropdown-toggle');
  }, []);

  return (
    <header className='main_header'>
      <div className='brand'>
        <Dropdown>
          <Dropdown.Toggle variant='primary' id='dropdown-basic'>
            <i className='fas fa-bars'></i>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href='#/action-1'>Categoria 1</Dropdown.Item>
            <Dropdown.Item href='#/action-2'>Categoria 2</Dropdown.Item>
            <Dropdown.Item href='#/action-3'>Categoria 3</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className='actions ml-5'>
        <Button variant='light' className='mx-2'>
          <i className='fas fa-home'></i>
        </Button>
        <Button variant='light' className='mx-2'>
          <i className='fas fa-map-marked'></i>
        </Button>
        <Button variant='light' className='mx-2'>
          <i className='fas fa-share-alt'></i>
        </Button>
        <Button
          variant='light'
          className='mx-2'
          onClick={(e) =>
            dispatch(shoppingCartSlice.actions.toggleShoppingCart())
          }
        >
          <i className='fas fa-shopping-cart'></i>
        </Button>
        <Badge
          variant='primary'
          style={{ position: 'relative', right: '1.5rem', bottom: '.75rem' }}
        >
          {pendingCount}
        </Badge>
      </div>
      <div className='profile'>
        <Button variant='light'>Iniciar Sesión</Button>
      </div>
    </header>
  );
};

export default Navbar;
