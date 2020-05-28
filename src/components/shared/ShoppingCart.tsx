import React from 'react';
import { isMobileOnly } from 'react-device-detect';
import { useSelector, useDispatch } from 'react-redux';
import {
  shoppingCartStateSelector,
  shoppingCartArticlesSelector,
  shoppingCartSlice,
} from '../../redux/slices/shoppingCartSlice';
import { Card, Button, Form } from 'react-bootstrap';
import { Article } from '../../models/Shared';

const ShoppingCart = () => {
  const dispatch = useDispatch();

  const isShoppingCartActive = useSelector(shoppingCartStateSelector);
  const shoppingCardArticles = useSelector(shoppingCartArticlesSelector);

  return (
    <div
      className='main_shopping_cart'
      style={{
        width: `${
          isShoppingCartActive ? (isMobileOnly ? '100vw' : '30vw') : '0'
        }`,
      }}
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
          {shoppingCardArticles.map((article: Article, idx) => (
            <Card key={idx} className='mb-2' bg='secondary'>
              <Card.Body>
                <Card.Title className='text-light mb-0 d-flex align-items-center justify-content-between'>
                  {article.name}
                  <Form.Group className='w-25'>
                    <Form.Label>Cantidad</Form.Label>
                    <Form.Control type='number' />
                  </Form.Group>
                </Card.Title>
              </Card.Body>
            </Card>
          ))}
        </div>
        {shoppingCardArticles.length > 0 && (
          <Button variant='primary' className='my-4 w-100'>
            Confirmar compra
          </Button>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
