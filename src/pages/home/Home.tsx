import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';

export default function Home() {
  const dispatch = useDispatch();

  return (
    <Fragment>
      <h1>Hello</h1>
    </Fragment>
  );
}
