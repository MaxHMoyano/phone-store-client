import { AxiosResponse } from 'axios';

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
}

export const handleResponse = (response: AxiosResponse) => {
  // console.log(response);
  if (response.status === 401 || response.status === 403) {
    window.localStorage.removeItem('token');
    logout();
    window.location.reload(true);
  } else {
    return response.data;
  }
};
