import { News } from '../../models/Shared';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { newsService } from '../services/newsService';

interface NewsState {
  data: News[];
  pending: boolean;
  error: string;
}

const initialState: NewsState = {
  data: [],
  pending: false,
  error: '',
};

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    request: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.pending = true;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    success: (state, action: PayloadAction<News[]>) => {
      state.data = action.payload;
      state.pending = false;
    },
    failure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const fetchNews = (): AppThunk => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch(newsSlice.actions.request());
      const news: News[] = await newsService.fetchNews();
      dispatch(newsSlice.actions.success(news));
      resolve(news);
    } catch (error) {
      dispatch(newsSlice.actions.failure(error));
      reject(error);
    }
  });
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectNewsCount = (state: RootState) => state.news.data.length;
export const selectNews = (state: RootState) => state.news.data;
export const selectNewsPendingStatus = (state: RootState) => state.news.pending;

export default newsSlice.reducer;
