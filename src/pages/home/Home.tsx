import React, { Fragment, CSSProperties } from 'react';
import { useDispatch } from 'react-redux';
import { Articles } from '../articles/Articles';

export default function Home() {
  const dispatch = useDispatch();

  const homeStyles: CSSProperties = {
    textAlign: 'center',
  };

  return (
    <div style={homeStyles}>
      <Articles />
    </div>
  );
}
