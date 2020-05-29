import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { Article } from '../../models/Shared';

interface ShoppingCart {
  active: Boolean;
  articles: Article[];
  recentlyAdded: Article[];
}

const initialState: ShoppingCart = {
  active: false,
  articles: [],
  recentlyAdded: [],
};

export const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {
    toggleShoppingCart: (state, action: PayloadAction<Boolean>) => {
      if (action.payload) {
        state.active = action.payload;
      } else {
        state.active = !state.active;
      }
    },
    addArticleToShoppingCart: (state, action: PayloadAction<Article>) => {
      state.articles.push(action.payload);
      state.recentlyAdded.push(action.payload);
    },
    removeArticleFromShoppingCart: (state, action: PayloadAction<Article>) => {
      state.articles = state.articles.filter((e) => e.id !== action.payload.id);
    },
    removeArticleFromRecentlyAdded: (state, action: PayloadAction<Article>) => {
      let idx = state.recentlyAdded.findIndex(
        (e) => e.id === action.payload.id
      );
      state.recentlyAdded.splice(idx, 1);
    },
  },
});

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const addArticleToShoppingCart = (article: Article): AppThunk => (
  dispatch
) => {
  dispatch(shoppingCartSlice.actions.addArticleToShoppingCart(article));
  setTimeout(() => {
    dispatch(shoppingCartSlice.actions.removeArticleFromRecentlyAdded(article));
  }, 1500);
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const shoppingCartStateSelector = (state: RootState) =>
  state.shoppingCart.active;
export const shoppingCartArticlesCountSelector = (state: RootState) =>
  state.shoppingCart.articles.length;
export const shoppingCartArticlesSelector = (state: RootState) =>
  state.shoppingCart.articles;
export const shoppingCartRecentlyAddedArticlesSelector = (state: RootState) =>
  state.shoppingCart.recentlyAdded;

export default shoppingCartSlice.reducer;
