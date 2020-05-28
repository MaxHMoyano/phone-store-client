import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Button } from 'react-bootstrap';
import {
  addArticleToShoppingCart,
  shoppingCartSlice,
} from '../../redux/slices/shoppingCartSlice';
import { selectArticles } from '../../redux/slices/articlesSlice';

export default function Articles() {
  const dispatch = useDispatch();

  const articles = useSelector(selectArticles);

  const [showShoppingCart, setShowShoppingCart] = useState(false);

  const addArticleToCart = (article) => {
    dispatch(addArticleToShoppingCart(article));
    if (!showShoppingCart) {
      dispatch(shoppingCartSlice.actions.toggleShoppingCart(true));
    }
    setShowShoppingCart(true);
  };

  useEffect(() => {
    // dispatch(fetchArticles());
  }, [dispatch]);

  return (
    <div className='articles_container'>
      {articles.map((article, idx) => (
        <Card
          key={idx}
          style={{ boxShadow: '5px 10px 16px #acacac' }}
          className='article'
        >
          <Card.Img variant='top' src={article.image} height='200' />
          <Card.Body className='d-flex justify-content-between align-items-center'>
            <div className='d-flex flex-column'>
              <Card.Title className='mb-1'>{article.name}</Card.Title>
              <Card.Title className='mb-1 text-left font-weight-bold'>
                ${article.price}
              </Card.Title>
            </div>
            <Button
              variant='primary'
              onClick={(e) => addArticleToCart(article)}
            >
              <i className='fas fa-shopping-cart'></i>
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}
