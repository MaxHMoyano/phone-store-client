import React, { Fragment } from 'react';
import MainContainer from './components/layout/MainContainer';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <MainContainer />
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
