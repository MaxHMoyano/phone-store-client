import React from 'react';
import Header from './Navbar';
import Footer from './Footer';
import Home from '../../pages/home/Home';
import ShoppingCart from '../shared/ShoppingCart';

const MainContainer = () => {
  return (
    <div className='main_container'>
      <Header />
      <div className='main_content'>
        <Home></Home>
      </div>
      <ShoppingCart />
      <Footer />
    </div>
  );
};

export default MainContainer;
