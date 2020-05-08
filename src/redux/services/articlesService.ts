import { handleResponse } from '../../util/serverResponse';
import dotenv from 'dotenv';

// load env vars
dotenv.config({ path: '../../config/config.env' });

export const articlesService = {
  fetchRates,
};

function fetchRates() {
  const requestOptions = {
    method: 'GET',
    // headers: authHeader(),
  };
  let url = `${process.env.API_URL}/${process.env.API_VERSION}/articles`;
  return fetch(url, requestOptions).then(handleResponse);
}
