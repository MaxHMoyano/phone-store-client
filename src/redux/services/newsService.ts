import { handleResponse } from '../../util/serverResponse';
import axios from 'axios';
import { News } from '../../models/Shared';

export const newsService = {
  fetchNews,
  getNews,
  createNews,
  updateNews,
  deleteNews,
};

function fetchNews(): Promise<News[]> {
  return axios
    .get(
      `${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_API_VERSION}/news/`
    )
    .then(handleResponse);
}
function getNews(newsId: string): Promise<News> {
  return axios
    .get(
      `${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_API_VERSION}/news/${newsId}`
    )
    .then(handleResponse);
}
function createNews(news: FormData): Promise<News> {
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
function updateNews(newsId: string, news: FormData): Promise<News> {
  return axios
    .post(
      `${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_API_VERSION}/news/${newsId}`,
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
