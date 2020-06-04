import React, { Fragment } from 'react';
import MainContainer from './components/layout/MainContainer';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

function App() {
  // Add a request interceptor
  axios.interceptors.request.use(
    (config) => {
      if (
        config.url ===
          'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA9AaR6CUuvREG_QrajjPmCj6U0ZT2UdIU' ||
        config.url ===
          'https://securetoken.googleapis.com/v1/token?key=AIzaSyA9AaR6CUuvREG_QrajjPmCj6U0ZT2UdIU'
      ) {
        return config;
      }
      const token = window.localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = 'Bearer ' + token;
      }
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );

  //Add a response interceptor

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    function (error) {
      const originalRequest = error.config;

      if (
        error.response.status === 401 &&
        originalRequest.url ===
          'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA9AaR6CUuvREG_QrajjPmCj6U0ZT2UdIU'
      ) {
        // router.push('/login');
        return Promise.reject(error);
      }

      if (error.response.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = window.localStorage.getItem('refresh_token');
        return axios
          .post(
            'https://securetoken.googleapis.com/v1/token?key=AIzaSyA9AaR6CUuvREG_QrajjPmCj6U0ZT2UdIU',
            {
              grant_type: 'refresh_token',
              refresh_token: refreshToken,
            }
          )
          .then((res) => {
            if (res.status === 200) {
              window.localStorage.setItem('token', res.data.id_token);
              window.localStorage.setItem(
                'refresh_token',
                res.data.refresh_token
              );
              axios.defaults.headers.common['Authorization'] =
                'Bearer ' + window.localStorage.getItem('token');
              return axios(originalRequest);
            }
          });
      }
      return Promise.reject(error);
    }
  );

  return (
    <Fragment>
      <BrowserRouter>
        <MainContainer />
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
