import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, Badge, Button } from 'react-bootstrap';
import {
  addArticleToShoppingCart,
  shoppingCartSlice,
} from '../../redux/slices/shoppingCartSlice';
import {
  selectArticles,
  fetchArticles,
  selectArticlesPendingState,
} from '../../redux/slices/articlesSlice';
import { fetchTransactions } from '../../redux/slices/TransactionsSlice';
import { Article, Subarticle } from '../../models/Shared';
import {
  selectSelectedCategory,
  categoriesSlice,
} from '../../redux/slices/categoriesSlice';
import { userLoggedInState } from '../../redux/slices/userSlice';
import CreateArticle from '../../components/shared/CreateArticle';
import DeleteArticle from '../../components/shared/DeleteArticle';

export default function Articles() {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(userLoggedInState);
  const articles = useSelector(selectArticles);
  const selectedCategory = useSelector(selectSelectedCategory);
  const articlesPending = useSelector(selectArticlesPendingState);

  const [showDeleteArticleModal, setShowDeleteArticleModal] = useState<boolean>(
    false,
  );
  const [showCreateArticleModal, setShowCreateArticleModal] = useState<boolean>(
    false,
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

  const deleteSelectedCategory = async () => {
    try {
      dispatch(categoriesSlice.actions.removeActive());
      dispatch(fetchArticles());
    } catch (error) {}
  };

  const getShortenedSubarticleName = (name: string) => {
    let splittedString = name.split('(');
    return `${splittedString[1].replace(/[)]/g, '')}`;
  };

  // Empty articles
  if (!articlesPending && !articles.length) {
    return (
      <div
        id={'articles_container'}
        className={
          'd-flex justify-content-center align-items-center flex-column'
        }
        style={{ margin: '2.5rem 0 2.5rem 0' }}>
        <i className='fas fa-battery-empty fa-3x'></i>
        <span className='mt-4'>No hay nada!</span>
      </div>
    );
  }

  if (articlesPending) {
    return (
      <div
        id={'articles_container'}
        className={
          'd-flex justify-content-center align-items-center flex-column'
        }
        style={{ margin: '2.5rem 0 2.5rem 0' }}>
        <i className='fas fa-spin fa-spinner fa-3x'></i>
        <span className='mt-4'>Cargando productos . . .</span>
      </div>
    );
  }

  return (
    <div id={'articles_container'} style={{ margin: '2.5rem 0 2.5rem 0' }}>
      <CreateArticle
        show={showCreateArticleModal}
        onHide={(e) => {
          setShowCreateArticleModal(false);
          setSelectedArticle(null);
        }}
        articleId={selectedArticle ? selectedArticle.id : ''}
      />
      <DeleteArticle
        show={showDeleteArticleModal}
        onHide={(e) => {
          setShowDeleteArticleModal(false);
          setSelectedArticle(null);
        }}
        articleId={selectedArticle ? selectedArticle.id : ''}
      />
      <h3 className={'mb-4'}>
        {selectedCategory && (
          <Badge variant='info'>
            <span>{selectedCategory.name}</span>
            <i
              onClick={deleteSelectedCategory}
              className='badge_icon fas fa-times ml-3'></i>
          </Badge>
        )}
      </h3>
      <div className='articles_container'>
        {articles.map((article: Article, idx) => (
          <div key={idx} className={`article`}>
            {isLoggedIn && (
              <div style={{ position: 'absolute', right: 0, padding: '.5rem' }}>
                <Button
                  variant={'light'}
                  className={'mx-1'}
                  onClick={(e) => handleEditArticleSelect(article)}>
                  <i className='fas fa-edit'></i>
                </Button>

                <Button
                  variant={'danger'}
                  className={'mx-1'}
                  onClick={(e) => handleDeleteArticleSelect(article)}>
                  <i className='fas fa-trash'></i>{' '}
                </Button>
              </div>
            )}
            <div className='article_header'>
              <img alt={'article_image'} src={article.photo} />
            </div>
            <div className='article_content'>
              <div className='article_description'>
                <h3 className='mb-1'>{article.name}</h3>
                {article.active && (
                  <h3 className='text-success mb-0'>{'En stock'}</h3>
                )}
              </div>
              {article.active ? (
                <Dropdown className={'ml-2'}>
                  <Dropdown.Toggle
                    id={`shooping_item_${idx}`}
                    className={'shopping_dropwdown'}
                    variant='success'>
                    <i className='fas fa-shopping-cart'></i>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {article.subarticles &&
                      article.subarticles.length > 0 &&
                      article.subarticles.map(
                        (subarticle: Subarticle, idx) =>
                          !subarticle.disabled && (
                            <Dropdown.Item
                              key={idx}
                              disabled={!subarticle.active}
                              onClick={(e) => addArticleToCart(subarticle)}>
                              <span
                                style={{
                                  textDecoration: subarticle.active
                                    ? ''
                                    : 'line-through',
                                }}>
                                {subarticle.name.length > 25
                                  ? getShortenedSubarticleName(subarticle.name)
                                  : subarticle.name}
                              </span>
                              <span>&nbsp; - ${subarticle.price}</span>
                            </Dropdown.Item>
                          ),
                      )}
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <span className={'text-danger'}>Sin stock</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
