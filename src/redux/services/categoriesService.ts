import { handleResponse } from '../../util/serverResponse';
import axios from 'axios';
import { Category } from '../../models/Shared';

export const categoriesService = {
  fetchCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};

function fetchCategories() {
  return axios
    .get(
      `${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_API_VERSION}/categories/`
    )
    .then(handleResponse);
}
function getCategory(categoryId: string) {
  return axios
    .get(
      `${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_API_VERSION}/categories/${categoryId}`
    )
    .then(handleResponse);
}
function createCategory(category: Category) {
  return axios
    .post(
      `${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_API_VERSION}/categories/`,
      category
    )
    .then(handleResponse);
}
function updateCategory(category: Category) {
  return axios
    .patch(
      `${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_API_VERSION}/categories/${category.id}`,
      category
    )
    .then(handleResponse);
}
function deleteCategory(categoryId) {
  return axios
    .delete(
      `${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_API_VERSION}/categories/${categoryId}`
    )
    .then(handleResponse);
}
