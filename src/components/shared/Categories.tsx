import React, { Fragment, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { isMobileOnly } from 'react-device-detect';
import { useSelector, useDispatch } from 'react-redux';
import { Category } from '../../models/Shared';
import {
  selectCategories,
  categoriesSlice,
  selectedCategoriesPendingState,
} from '../../redux/slices/categoriesSlice';
import { fetchArticles } from '../../redux/slices/articlesSlice';
import { userLoggedInState } from '../../redux/slices/userSlice';
import CategoriesModal from './CategoriesModal';

const Categories = () => {
  // global dispatch
  const dispatch = useDispatch();

  // selectors
  const categories = useSelector(selectCategories);
  const categoriesPending = useSelector(selectedCategoriesPendingState);
  const isUserLoggedIn = useSelector(userLoggedInState);

  // local state
  const [showManageCategoryModal, setShowManageCategoryModal] = useState<
    boolean
  >(false);

  const handleCategoryChange = (category: Category) => {
    dispatch(categoriesSlice.actions.setActive(category));
    document.location.href = '#articles_wrapper';
    dispatch(fetchArticles(category.id));
  };

  return (
    <Fragment>
      <CategoriesModal
        show={showManageCategoryModal}
        onHide={(e) => setShowManageCategoryModal(false)}
      />
      <Dropdown>
        <Dropdown.Toggle variant='primary' id='categories-dropdown'>
          {!isMobileOnly ? (
            <Fragment>
              <span>Categorias</span>
              <i className='fas fa-caret-down ml-2'></i>
            </Fragment>
          ) : (
            <Fragment>
              <i className='fas fa-bars'></i>
            </Fragment>
          )}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {categoriesPending ? (
            <div className={'d-flex justify-content-center'}>
              <i className={'fas fa-spin fa-spinner'}></i>
            </div>
          ) : (
            <Fragment>
              {categories.map((category, idx) => (
                <Dropdown.Item
                  onClick={(e) => handleCategoryChange(category)}
                  key={idx}>
                  {category.name}
                </Dropdown.Item>
              ))}
              {isUserLoggedIn && (
                <Dropdown.Item
                  onClick={(e) => setShowManageCategoryModal(true)}>
                  <i className='fas fa-plus mr-2'></i>
                  <span>Agregar categoria</span>
                </Dropdown.Item>
              )}
            </Fragment>
          )}
        </Dropdown.Menu>
      </Dropdown>
    </Fragment>
  );
};

export default Categories;
