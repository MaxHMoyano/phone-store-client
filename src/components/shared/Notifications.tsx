import React from 'react';
import { Toast } from 'react-bootstrap';
import { shoppingCartRecentlyAddedArticlesSelector } from '../../redux/slices/shoppingCartSlice';
import { useSelector } from 'react-redux';

const Notifications = () => {
  const recentlyAddedArticles = useSelector(
    shoppingCartRecentlyAddedArticlesSelector
  );

  return (
    recentlyAddedArticles.length > 0 && (
      <div className='shopping_toasts'>
        {recentlyAddedArticles.map(
          (article, idx) =>
            idx < 2 && (
              <Toast key={idx}>
                <Toast.Header className='p-2' closeButton={false}>
                  <strong className='mr-auto'>Item agregado al carrito</strong>
                </Toast.Header>
                <Toast.Body>{article.name}</Toast.Body>
              </Toast>
            )
        )}
      </div>
    )
  );
};

export default Notifications;
