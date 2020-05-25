import Article from '../../models/Article';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';

interface PendingTransaction {
  list: Article[];
}

const initialState: PendingTransaction = {
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
