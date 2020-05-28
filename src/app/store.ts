import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import articles from '../redux/slices/articlesSlice';
import pendingTransactions from '../redux/slices/pendingTransactionsSlice';
import shoppingCart from '../redux/slices/shoppingCartSlice';
import categories from '../redux/slices/categoriesSlice';

export const store = configureStore({
  reducer: {
    articles,
    pendingTransactions,
    shoppingCart,
    categories,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
