import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import articlesReducer from '../redux/slices/articlesSlice';

export const store = configureStore({
  reducer: {
    articles: articlesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
