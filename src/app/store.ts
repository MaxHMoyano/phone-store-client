import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import articles from '../redux/slices/articlesSlice';
import transactions from '../redux/slices/TransactionsSlice';
import shoppingCart from '../redux/slices/shoppingCartSlice';
import categories from '../redux/slices/categoriesSlice';
import user from '../redux/slices/userSlice';
import news from '../redux/slices/newsSlice';

export const store = configureStore({
  reducer: {
    articles,
    transactions,
    shoppingCart,
    categories,
    user,
    news,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
