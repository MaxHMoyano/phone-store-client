import { Article, Subarticle } from '../../models/Shared';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { articlesService } from '../services/articlesService';

interface ArticlesState {
  pending: boolean;
  error: string;
  data: Article[];
}

const initialState: ArticlesState = {
  pending: false,
  error: '',
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
      state.pending = false;
    },
    error: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.pending = false;
    },
    updateArticle: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.pending = false;
    },
    deleteArticle: (state, action: PayloadAction<string>) => {
      let idx = state.data.findIndex((e) => e.id === action.payload);
      state.data.splice(idx, 1);
    },
    updateSubarticle: (state, action: PayloadAction<Subarticle>) => {
      let articleIdx = state.data.findIndex(
        (e) => e.id === action.payload.article,
      );
      let subarticleIdx = state.data[articleIdx].subarticles.findIndex(
        (e) => e.id === action.payload.id,
      );
      state.data[articleIdx].subarticles[subarticleIdx] = {
        ...action.payload,
      };
    },
  },
});

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const fetchArticles = (
  filterBy: string = '',
  sortBy: string = '',
): AppThunk => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch(articlesSlice.actions.request());
      const articles: Article[] = await articlesService.fetchArticles(
        filterBy,
        sortBy,
      );
      dispatch(articlesSlice.actions.success(articles));
      resolve(articles);
    } catch (error) {
      reject(error);
    }
  });
};

export const deleteArticle = (articleId: string): AppThunk => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      await articlesService.deleteArticle(articleId);
      dispatch(articlesSlice.actions.deleteArticle(articleId));
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};
export const updateSubarticle = (subarticle: Subarticle): AppThunk => (
  dispatch,
) => {
  return new Promise(async (resolve, reject) => {
    try {
      await articlesService.updateSubarticle(subarticle);
      dispatch(articlesSlice.actions.updateSubarticle(subarticle));
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectArticles = (state: RootState) => state.articles.data;
export const selectArticlesPendingState = (state: RootState) =>
  state.articles.pending;

export default articlesSlice.reducer;
