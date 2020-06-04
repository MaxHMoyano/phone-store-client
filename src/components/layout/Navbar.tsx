import React, { useEffect, Fragment } from 'react';
import {
  Button,
  Badge,
  Dropdown,
  Tooltip,
  OverlayTrigger,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import {
  shoppingCartSlice,
  shoppingCartArticlesCountSelector,
} from '../../redux/slices/shoppingCartSlice';
import {
  selectCategories,
  fetchCategories,
  categoriesSlice,
} from '../../redux/slices/categoriesSlice';
import { isMobileOnly } from 'react-device-detect';
import { userLoggedInState } from '../../redux/slices/userSlice';
import Profile from '../navbar/Profile';
import { fetchArticles } from '../../redux/slices/articlesSlice';

// Component
const Navbar = () => {
  const dispatch = useDispatch();

  const pendingCount = useSelector(shoppingCartArticlesCountSelector);
  const categories = useSelector(selectCategories);
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

  const handleCategoryChange = (category) => {
    dispatch(categoriesSlice.actions.setActive(category));
    document.location.href = '#articles_container';
    dispatch(fetchArticles());
  };

  return (
    <Fragment>
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
                <Dropdown.Item
                  onClick={(e) => handleCategoryChange(category)}
                  key={idx}
                >
                  {category.name}
                </Dropdown.Item>
              ))}
              {isUserLoggedIn && (
                <Dropdown.Item>
                  <i className='fas fa-plus mr-2'></i>
                  <span>Agregar categoria</span>
                </Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
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
            <OverlayTrigger
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
            </OverlayTrigger>
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
