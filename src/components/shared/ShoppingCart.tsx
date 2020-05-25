import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  shoppinCartStateSelector,
  shoppingCartArticlesSelector,
  shoppingCartSlice,
} from '../../redux/slices/shoppingCartSlice';
import { Card, Button } from 'react-bootstrap';
import Article from '../../models/Article';

const ShoppingCart = () => {
  const dispatch = useDispatch();

  const isShoppingCartActive = useSelector(shoppinCartStateSelector);
  const shoppingCardArticles = useSelector(shoppingCartArticlesSelector);

  return (
    <div
      className='main_shopping_cart'
      style={{ width: `${isShoppingCartActive ? '50vw' : '0'}` }}
    >
      <div
        className='main_shopping_cart_container'
        style={{ display: `${isShoppingCartActive ? 'block' : 'none'}` }}
      >
        <i
          onClick={() =>
            dispatch(shoppingCartSlice.actions.toggleShoppingCart())
          }
          className='fas fa-times fa-2x mb-2 shopping_cart_close'
        ></i>
        <div className='shopping_cart_articles mt-5'>
          {shoppingCardArticles.map((article: Article) => (
            <Card className='mb-2' bg='secondary'>
              <Card.Body>
                <Card.Title className='text-light'>{article.name}</Card.Title>
                <Card.Text className='text-light'>
                  {article.description}
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
        {shoppingCardArticles.length && (
          <Button variant='primary' className='mt-4'>
            Confirmar compra
          </Button>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
