import { Article } from '../../models/Shared';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { articlesService } from '../services/articlesService';

interface ArticlesState {
  pending: Boolean;
  error: Boolean;
  data: Article[];
}

const initialState: ArticlesState = {
  pending: false,
  error: false,
  data: [],
};

export const articlesSlice = createSlice({
  name: 'articles',
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
    success: (state, action: PayloadAction<Article[]>) => {
      state.data = action.payload;
    },
  },
});

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const fetchArticles = (filterBy: string, sortBy: string): AppThunk => (
  dispatch
) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch(articlesSlice.actions.request());
      const articles: Article[] = await articlesService.fetchArticles();
      dispatch(articlesSlice.actions.success(articles));
      resolve(articles);
    } catch (error) {
      reject(error);
    }
  });
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectArticles = (state: RootState) => state.articles.data;

export default articlesSlice.reducer;
