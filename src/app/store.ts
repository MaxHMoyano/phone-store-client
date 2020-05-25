import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import articlesSlice from '../redux/slices/articlesSlice';
import pendingTransactions from '../redux/slices/pendingTransactionsSlice';
import shoppingCart from '../redux/slices/shoppingCartSlice';

export const store = configureStore({
  reducer: {
    articles: articlesSlice,
    pendingTransactions: pendingTransactions,
    shoppinCart: shoppingCart,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
