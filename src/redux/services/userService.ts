import axios, { AxiosResponse } from 'axios';

export const userService = {
  logUser,
};

function logUser(email, password) {
  return axios
    .post(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA9AaR6CUuvREG_QrajjPmCj6U0ZT2UdIU',
      {
        email,
        password,
        returnSecureToken: true,
      }
    )
    .then((response: AxiosResponse) => {
      window.localStorage.setItem('token', `${response.data.idToken}`);
      window.localStorage.setItem(
        'refresh_token',
        `${response.data.refreshToken}`
      );
    });
}
