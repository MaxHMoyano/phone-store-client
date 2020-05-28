import React, { Fragment } from 'react';
import Articles from '../articles/Articles';
import { Badge } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { selectSelectedCategory } from '../../redux/slices/categoriesSlice';

export default function Home() {
  const selectedCategory = useSelector(selectSelectedCategory);

  return (
    <Fragment>
      <div>
        <h2>Tienda CoolCovers</h2>
        <h3>
          <Badge variant='info'>{selectedCategory.name}</Badge>
        </h3>
        <hr />
        <Articles />
      </div>
    </Fragment>
  );
}
