import React, { Fragment } from 'react';
import Articles from '../articles/Articles';
import Home from './Home';

export default function Content() {
  return (
    <Fragment>
      <Home />
      <hr />
      <Articles />
      {/* <Contact /> */}
    </Fragment>
  );
}
