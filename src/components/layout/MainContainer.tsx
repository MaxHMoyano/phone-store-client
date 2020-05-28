import React from 'react';
import Header from './Navbar';
import Footer from './Footer';
import Content from '../../pages/content/Content';
import ShoppingCart from '../shared/ShoppingCart';
import Notifications from '../shared/Notifications';
import {
  shoppingCartStateSelector,
  shoppingCartSlice,
} from '../../redux/slices/shoppingCartSlice';
import { useSelector, useDispatch } from 'react-redux';

const MainContainer = () => {
  const dispatch = useDispatch();

  const isShoppingCartActive = useSelector(shoppingCartStateSelector);

  const closeShoppingCart = () => {
    if (isShoppingCartActive) {
      dispatch(shoppingCartSlice.actions.toggleShoppingCart(false));
    }
  };

  return (
    <div className='main_container'>
      <Header />
      <Notifications />
      <div
        className={`main_content ${isShoppingCartActive ? 'inactive' : ''}`}
        onClick={closeShoppingCart}
      >
        <Content></Content>
      </div>
      <ShoppingCart />
      <Footer />
    </div>
  );
};

export default MainContainer;
