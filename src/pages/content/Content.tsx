import React, { Fragment } from 'react';
import Articles from '../articles/Articles';
import Home from './Home';
import Contact from './Contact';

export default function Content() {
  return (
    <Fragment>
      <Home />
      <Articles />
      {/* <Contact /> */}
    </Fragment>
  );
}
