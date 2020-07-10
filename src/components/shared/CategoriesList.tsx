import React, { Fragment } from 'react';
import { isMobileOnly } from 'react-device-detect';
import { useSelector, useDispatch } from 'react-redux';
import { Category } from '../../models/Shared';
import {
  selectCategories,
  selectedCategoriesPendingState,
  selectCategory,
  selectSelectedCategory,
} from '../../redux/slices/categoriesSlice';
function CategoriesList() {
  // global dispatch
  const dispatch = useDispatch();

  // selectors
  const categories = useSelector(selectCategories);
  const categoriesPending = useSelector(selectedCategoriesPendingState);
  const selectedCategory = useSelector(selectSelectedCategory);

  const handleCategorySelection = (category: Category) => {
    dispatch(
      selectCategory(
        selectedCategory && selectedCategory.id === category.id
          ? null
          : category,
      ),
    );
  };
  return (
    <Fragment>
      {categories.map((category, idx) => (
        <span
          key={idx}
          onClick={(e) => handleCategorySelection(category)}
          className={`category_selector ${category.selected ? 'active' : ''}`}>
          {category.name}
        </span>
      ))}
    </Fragment>
  );
}

export default CategoriesList;
