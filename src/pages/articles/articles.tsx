import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectData,
  fetchArticles,
} from '../../redux/reducers/articlesReducer';

export function Articles() {
  const articles = useSelector(selectData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  return (
    <Fragment>
      <h1>Hello</h1>
    </Fragment>
  );
}
