import React, { useEffect, Fragment } from 'react';
import { Button, Badge, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

// Local imports
import Logo from '../../assets/logo.png';
import {
  shoppingCartSlice,
  shoppingCartArticlesCountSelector,
} from '../../redux/slices/shoppingCartSlice';
import { fetchCategories } from '../../redux/slices/categoriesSlice';
import { userLoggedInState } from '../../redux/slices/userSlice';
import Profile from '../navbar/Profile';
import Categories from '../shared/Categories';

// Component
const Navbar = () => {
  const dispatch = useDispatch();

  const pendingCount = useSelector(shoppingCartArticlesCountSelector);

  const isUserLoggedIn = useSelector(userLoggedInState);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    document
      .querySelectorAll('#categories-dropdown, #profile-dropdown')
      .forEach((e) => {
        e.classList.remove('dropdown-toggle');
      });
  }, [isUserLoggedIn]);

  return (
    <Fragment>
      <header className='main_header'>
        <div className='brand'>
          <img src={Logo} alt='Logo' />
          {/* <Categories /> */}
        </div>
        <OverlayTrigger
          placement={'bottom'}
          overlay={<Tooltip id={'tooltip-cart'}>Carrito</Tooltip>}>
          <Button
            variant='dark'
            className='navbar_button'
            onClick={(e) =>
              dispatch(shoppingCartSlice.actions.toggleShoppingCart())
            }
            style={{ position: 'relative' }}>
            <i className='fas fa-shopping-cart'></i>
            <Badge
              variant='primary'
              style={{
                position: 'absolute',
                top: '-.5rem',
              }}>
              {pendingCount}
            </Badge>
          </Button>
        </OverlayTrigger>
      </header>
    </Fragment>
  );
};

export default Navbar;
