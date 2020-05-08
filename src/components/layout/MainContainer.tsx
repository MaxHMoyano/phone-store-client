import React, { Fragment } from 'react';
import Header from './Navbar';
import Footer from './Footer';
import { Articles } from '../../pages/articles/Articles';

const MainContainer = () => {
  return (
    <div className='main_container'>
      <Header />
      <Footer />
    </div>
  );
};

export default MainContainer;
