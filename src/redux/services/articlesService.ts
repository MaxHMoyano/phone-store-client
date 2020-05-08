import { handleResponse } from '../../util/serverResponse';

export const articlesService = {
  fetchRates,
};

function fetchRates() {
  const requestOptions = {
    method: 'GET',
  };
  let url = `${process.env.REACT_APP_API_URL}/articles/`;
  return fetch(url, requestOptions).then(handleResponse);
}
