import React, { useState } from 'react';
import { isMobileOnly } from 'react-device-detect';
import { useSelector, useDispatch } from 'react-redux';
import {
  shoppingCartStateSelector,
  shoppingCartArticlesSelector,
  shoppingCartSlice,
} from '../../redux/slices/shoppingCartSlice';
import { Card, Button, Form } from 'react-bootstrap';
import { Transaction } from '../../models/Shared';
import { transactionsService } from '../../redux/services/transactionsService';

const ShoppingCart = () => {
  const dispatch = useDispatch();

  const isShoppingCartActive = useSelector(shoppingCartStateSelector);
  const shoppingCardArticles = useSelector(shoppingCartArticlesSelector);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const sendMessageAndSaveTransaction = async () => {
    let transaction: Transaction = {
      items: shoppingCardArticles,
    };
    setIsSubmitting(true);
    await transactionsService.createTransaction(transaction);
    dispatch(shoppingCartSlice.actions.toggleShoppingCart());
    let request = '';
    shoppingCardArticles.forEach((item) => {
      request += `${item.quantity} de ${item.name} %0a`;
    });
    setIsSubmitting(false);
    window.open(
      `https://api.whatsapp.com/send?phone=0123456789&text=Hola%2C%20Te%20paso%20mi%20pedido%20de:%0a ${request}`,
      '_blank'
    );
  };

  return (
    <div
      className='main_shopping_cart'
      style={{
        width: `${
          isShoppingCartActive ? (isMobileOnly ? '100vw' : '35vw') : '0'
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
          {shoppingCardArticles.map((item, idx) => (
            <Card key={idx} className='mb-2' bg='secondary'>
              <Card.Body>
                <i
                  onClick={(e) =>
                    dispatch(
                      shoppingCartSlice.actions.removeArticleFromShoppingCart(
                        item
                      )
                    )
                  }
                  className='fas fa-trash delete_article'
                  style={{
                    position: 'absolute',
                    right: '.5rem',
                    top: '.5rem',
                    fontSize: '.75rem',
                  }}
                ></i>

                <Card.Title className='text-light mb-0 d-flex align-items-center justify-content-between'>
                  {item.name}
                  <Form.Group className='w-25'>
                    <Form.Label>Cantidad</Form.Label>
                    <Form.Control
                      type={'number'}
                      value={item.quantity}
                      onChange={(e) =>
                        dispatch(
                          shoppingCartSlice.actions.changeItemQuantity({
                            ...item,
                            quantity: parseInt(e.target.value),
                          })
                        )
                      }
                    />
                  </Form.Group>
                </Card.Title>
              </Card.Body>
            </Card>
          ))}
        </div>
        {shoppingCardArticles.length > 0 && (
          <Button
            onClick={(e) => sendMessageAndSaveTransaction()}
            variant='primary'
            className='my-4 w-100'
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <i className='fa fa-spin fa-spinner'></i>
            ) : (
              <span>Confirmar compra</span>
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
