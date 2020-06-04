import { createSlice } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { userService } from '../services/userService';

interface User {
  loggedIn: Boolean;
  loggingIn: Boolean;
}

const token = window.localStorage.getItem('token');
const initialState: User = {
  loggedIn: token ? true : false,
  loggingIn: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logUserRequest: (state) => {
      state.loggingIn = true;
    },
    logUserSuccess: (state) => {
      state.loggedIn = true;
    },
    logout: (state) => {
      state.loggedIn = false;
    },
  },
});

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const logUser = (email, password): AppThunk => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch(userSlice.actions.logUserRequest());
      await userService.logUser(email, password);
      dispatch(userSlice.actions.logUserSuccess());
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const userLoggedInState = (state: RootState) => state.user.loggedIn;

export default userSlice.reducer;
