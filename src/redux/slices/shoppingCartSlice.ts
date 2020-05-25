import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import Article from '../../models/Article';

interface ShoppingCart {
  active: Boolean;
  articles: Article[];
}

const initialState: ShoppingCart = {
  active: false,
  articles: [],
};

export const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {
    toggleShoppingCart: (state) => {
      state.active = !state.active;
    },
    addPendingArticle: (state, action: PayloadAction<Article>) => {
      state.articles.push(action.payload);
    },
    deletePendingArticle: () => {},
  },
});

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const shoppinCartStateSelector = (state: RootState) =>
  state.shoppinCart.active;
export const shoppingCartArticlesCountSelector = (state: RootState) =>
  state.shoppinCart.articles.length;
export const shoppingCartArticlesSelector = (state: RootState) =>
  state.shoppinCart.articles;

export default shoppingCartSlice.reducer;
