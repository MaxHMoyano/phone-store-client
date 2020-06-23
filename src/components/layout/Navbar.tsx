import React, { useEffect, Fragment } from 'react';
import { Button, Badge, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
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
          <Categories />
        </div>
        <div className='actions'>
          <Fragment>
            <OverlayTrigger
              placement={'bottom'}
              overlay={<Tooltip id={'tooltip-home'}>Home</Tooltip>}
            >
              <Button
                variant='light'
                className='mx-2 navbar_button navbar_home'
                onClick={(e) => (document.location.href = '#home_container')}
              >
                <i className='fas fa-home'></i>
              </Button>
            </OverlayTrigger>
            {/* <OverlayTrigger
              placement={'bottom'}
              overlay={<Tooltip id={'tooltip-us'}>Contactanos</Tooltip>}
            >
              <Button
                variant='light'
                className='mx-2 navbar_button navbar_home'
                onClick={(e) => (document.location.href = '#contact_container')}
              >
                <i className='fas fa-map-marked'></i>
              </Button>
            </OverlayTrigger> */}
            {/* <OverlayTrigger
              placement={'bottom'}
              overlay={<Tooltip id={'tooltip-share'}>Compartí</Tooltip>}
            >
              <Button variant='light' className='mx-2 navbar_button'>
                <i className='fas fa-share-alt'></i>
              </Button>
            </OverlayTrigger> */}
            <OverlayTrigger
              placement={'bottom'}
              overlay={<Tooltip id={'tooltip-cart'}>Carrito</Tooltip>}
            >
              <Button
                variant='light'
                className='mx-2 navbar_button'
                onClick={(e) =>
                  dispatch(shoppingCartSlice.actions.toggleShoppingCart())
                }
              >
                <i className='fas fa-shopping-cart'></i>
              </Button>
            </OverlayTrigger>

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
        <Profile />
      </header>
    </Fragment>
  );
};

export default Navbar;
