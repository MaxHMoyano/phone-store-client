import { Article } from '../../models/Shared';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

interface PendingTransactions {
  list: Article[];
}

const initialState: PendingTransactions = {
  list: [],
};

export const pendingTransactionsSlice = createSlice({
  name: 'pendingTransactions',
  initialState,
  reducers: {},
});

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectPendingCount = (state: RootState) =>
  state.pendingTransactions.list.length;

export default pendingTransactionsSlice.reducer;
