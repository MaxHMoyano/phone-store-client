import { Transaction, Item } from '../../models/Shared';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { transactionsService } from '../services/transactionsService';
import { articlesService } from '../services/articlesService';

interface TransactionState {
  data: Transaction[];
  pending: boolean;
  error: string;
}

const initialState: TransactionState = {
  data: [],
  pending: false,
  error: '',
};

export const transactionsSlice = createSlice({
  name: 'transactions',
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
    success: (state, action: PayloadAction<Transaction[]>) => {
      state.data = action.payload;
      state.pending = false;
    },
    failure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    update: (state, action: PayloadAction<Transaction>) => {
      let idx = state.data.findIndex((e) => e.id === action.payload.id);
      if (idx !== -1) {
        state.data[idx] = action.payload;
      }
    },
  },
});

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const fetchTransactions = (): AppThunk => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch(transactionsSlice.actions.request());
      const transactions: Transaction[] = await transactionsService.fetchTransactions();
      let mappedTransaction = await Promise.all(
        transactions.map(mapTransaction)
      );
      dispatch(transactionsSlice.actions.success(mappedTransaction));
      resolve(mappedTransaction);
    } catch (error) {
      dispatch(transactionsSlice.actions.failure(error));
      reject(error);
    }
  });
};

export const updateTransaction = (transaction: Transaction): AppThunk => (
  dispatch
) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch(transactionsSlice.actions.update(transaction));
      let updatedTransaction = await transactionsService.updateTransaction(
        transaction
      );
      resolve(updatedTransaction);
    } catch (error) {
      reject(error);
    }
  });
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectTransactionCount = (state: RootState) =>
  state.transactions.data.length;
export const selectTransactions = (state: RootState) => state.transactions.data;
export const selectTransactionsPendingStatus = (state: RootState) =>
  state.transactions.pending;

export default transactionsSlice.reducer;

const mapTransaction = (transaction: Transaction): Promise<Transaction> => {
  return new Promise(async (resolve, reject) => {
    let mappedItems: Item[] = await Promise.all(
      transaction.items.map(
        (item): Promise<Item> => {
          return new Promise(async (resolve, reject) => {
            let subarticle = await articlesService.getSubarticle(
              item.subarticle
            );
            resolve({
              ...item,
              name: subarticle.name,
            });
          });
        }
      )
    );
    resolve({
      ...transaction,
      items: mappedItems,
    });
  });
};
