import { handleResponse } from '../../util/serverResponse';
import axios from 'axios';

export const newsService = {
  fetchNews,
  getNews,
  createNews,
  updateNews,
  deleteNews,
};

function fetchNews() {
  return axios
    .get(
      `${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_API_VERSION}/news/`
    )
    .then(handleResponse);
}
function getNews(newsId: string) {
  return axios
    .get(
      `${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_API_VERSION}/news/${newsId}`
    )
    .then(handleResponse);
}
function createNews(news: FormData) {
  return axios
    .post(
      `${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_API_VERSION}/news/`,
      news,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    .then(handleResponse);
}
function updateNews(news) {
  return axios
    .patch(
      `${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_API_VERSION}/news/${news.id}`,
      news
    )
    .then(handleResponse);
}
function deleteNews(newsId) {
  return axios
    .delete(
      `${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_API_VERSION}/news/${newsId}`
    )
    .then(handleResponse);
}
