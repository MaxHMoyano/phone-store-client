import { handleResponse } from '../../util/serverResponse';
import axios from 'axios';
import { Article, Subarticle } from '../../models/Shared';

export const articlesService = {
  fetchArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle,
  uploadArticlePhoto,
  createSubarticles,
  getSubarticle,
  updateSubarticle,
};

interface RequestFilter {
  sort_by?: string;
  filter_by?: string;
}

function fetchArticles(
  filterBy: string = '',
  sortBy: string = ''
): Promise<Article[]> {
  let params: RequestFilter = {
    filter_by: filterBy ? filterBy : null,
    sort_by: sortBy ? sortBy : null,
  };
  return axios
    .get(
      `${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_API_VERSION}/articles/`,
      {
        params,
      }
    )
    .then(handleResponse);
}
function getArticle(articleId: number): Promise<Article> {
  return axios
    .get(
      `${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_API_VERSION}/articles/${articleId}`
    )
    .then(handleResponse);
}
function createArticle(article: Article): Promise<Article> {
  return axios
    .post(
      `${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_API_VERSION}/articles/`,
      article
    )
    .then(handleResponse);
}
function updateArticle(article: Article): Promise<Article> {
  return axios
    .patch(
      `${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_API_VERSION}/articles/${article.id}`,
      article
    )
    .then(handleResponse);
}
function deleteArticle(articleId): Promise<Article> {
  return axios
    .delete(
      `${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_API_VERSION}/articles/${articleId}`
    )
    .then(handleResponse);
}

function uploadArticlePhoto(articleId: String, photo: File) {
  let form = new FormData();
  form.append('photo', photo);
  axios.post(
    `${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_API_VERSION}/articles/${articleId}/photo`,
    form,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
}

function createSubarticles(
  articleId: String,
  articleItems: Subarticle[]
): Promise<Subarticle[]> {
  return axios
    .post(
      `${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_API_VERSION}/articles/${articleId}/subarticles`,
      articleItems
    )
    .then(handleResponse);
}

function getSubarticle(subarticleId: String): Promise<Subarticle> {
  return axios
    .get(
      `${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_API_VERSION}/subarticles/${subarticleId}`
    )
    .then(handleResponse);
}

function updateSubarticle(subarticle: Subarticle): Promise<Subarticle> {
  return axios
    .patch(
      `${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_API_VERSION}/subarticles/${subarticle.id}`,
      subarticle
    )
    .then(handleResponse);
}
