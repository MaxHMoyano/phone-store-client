import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Dropdown, Badge, Button } from 'react-bootstrap';
import {
  addArticleToShoppingCart,
  shoppingCartSlice,
} from '../../redux/slices/shoppingCartSlice';
import {
  selectArticles,
  fetchArticles,
} from '../../redux/slices/articlesSlice';
import { fetchTransactions } from '../../redux/slices/TransactionsSlice';
import { Article, Subarticle } from '../../models/Shared';
import { selectSelectedCategory } from '../../redux/slices/categoriesSlice';
import { userLoggedInState } from '../../redux/slices/userSlice';
import CreateArticle from '../../components/shared/CreateArticle';
import DeleteArticle from '../../components/shared/DeleteArticle';

export default function Articles() {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(userLoggedInState);
  const articles = useSelector(selectArticles);
  const selectedCategory = useSelector(selectSelectedCategory);

  const [showDeleteArticleModal, setShowDeleteArticleModal] = useState<boolean>(
    false
  );
  const [showCreateArticleModal, setShowCreateArticleModal] = useState<boolean>(
    false
  );
  const [selectedArticle, setSelectedArticle] = useState<Article>(null);
  const [showShoppingCart, setShowShoppingCart] = useState<boolean>(false);

  const addArticleToCart = (subarticle: Subarticle) => {
    dispatch(addArticleToShoppingCart(subarticle));
    if (!showShoppingCart) {
      dispatch(shoppingCartSlice.actions.toggleShoppingCart(true));
    }
    setShowShoppingCart(true);
  };

  useEffect(() => {
    dispatch(fetchArticles());
    dispatch(fetchTransactions());
  }, [dispatch]);

  // Para quitar todos los caret down de los cart icons
  useEffect(() => {
    document
      .querySelectorAll('.shopping_dropwdown')
      .forEach((e) => e.classList.remove('dropdown-toggle'));
  }, [articles.length]);

  const handleDeleteArticleSelect = (article: Article) => {
    setSelectedArticle(article);
    setShowDeleteArticleModal(true);
  };

  const handleEditArticleSelect = (article: Article) => {
    setSelectedArticle(article);
    setShowCreateArticleModal(true);
  };

  if (!articles.length) {
    return (
      <div
        className={
          'd-flex justify-content-center align-items-center flex-column'
        }
      >
        <i className='fas fa-spin fa-spinner fa-3x'></i>
        <span className='mt-4'>Cargando productos . . .</span>
      </div>
    );
  }

  return (
    <Fragment>
      <CreateArticle
        show={showCreateArticleModal}
        onHide={(e) => setShowCreateArticleModal(false)}
        articleId={selectedArticle ? selectedArticle.id : ''}
      />
      <DeleteArticle
        show={showDeleteArticleModal}
        onHide={(e) => setShowDeleteArticleModal(false)}
        articleId={selectedArticle ? selectedArticle.id : ''}
      />
      <h3>
        {selectedCategory && (
          <Badge variant='info'>{selectedCategory.name}</Badge>
        )}
      </h3>
      <hr />
      <div id={'articles_container'} className='articles_container'>
        {articles.map((article: Article, idx) => (
          <Card
            key={idx}
            style={{ boxShadow: '5px 10px 16px #acacac' }}
            className={`article`}
          >
            {isLoggedIn && (
              <div style={{ position: 'absolute', right: 0, padding: '.5rem' }}>
                <Button
                  variant={'light'}
                  className={'mx-1'}
                  onClick={(e) => handleEditArticleSelect(article)}
                >
                  <i className='fas fa-edit'></i>
                </Button>

                <Button
                  variant={'danger'}
                  className={'mx-1'}
                  onClick={(e) => handleDeleteArticleSelect(article)}
                >
                  <i className='fas fa-trash'></i>{' '}
                </Button>
              </div>
            )}
            <Card.Img variant='top' src={article.photo} height='200' />
            <Card.Body className='d-flex justify-content-between align-items-center'>
              <div className='d-flex flex-column'>
                <Card.Title className='mb-1'>{article.name}</Card.Title>
                {article.active && (
                  <Card.Title className='text-success mb-0'>
                    {'En stock'}
                  </Card.Title>
                )}
              </div>
              {article.active ? (
                <Dropdown className={'ml-2'}>
                  <Dropdown.Toggle
                    id={`shooping_item_${idx}`}
                    className={'shopping_dropwdown'}
                    variant='success'
                  >
                    <i className='fas fa-shopping-cart'></i>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {article.subarticles &&
                      article.subarticles.length > 0 &&
                      article.subarticles.map((subarticle: Subarticle, idx) => (
                        <Dropdown.Item
                          key={idx}
                          disabled={!subarticle.active}
                          onClick={(e) => addArticleToCart(subarticle)}
                        >
                          <span
                            style={{
                              textDecoration: subarticle.active
                                ? ''
                                : 'line-through',
                            }}
                          >
                            {subarticle.name} - ${subarticle.price}
                          </span>
                        </Dropdown.Item>
                      ))}
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <span className={'text-danger'}>Sin stock</span>
              )}
            </Card.Body>
          </Card>
        ))}
      </div>
    </Fragment>
  );
}
