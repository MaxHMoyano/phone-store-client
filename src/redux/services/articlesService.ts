import { handleResponse } from '../../util/serverResponse';

export const articlesService = {
  fetchRates,
};

function fetchRates() {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Cache-Control': 'no-cache',
    },
  };
  let url = `${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_API_VERSION}/articles/`;
  return fetch(url, requestOptions).then(handleResponse);
}
