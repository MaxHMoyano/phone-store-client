import { Category } from '../../models/Shared';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { categoriesService } from '../services/categoriesService';

interface Categories {
  pending: Boolean;
  error: Boolean;
  data: Category[];
}

const initialState: Categories = {
  pending: false,
  error: false,
  data: [],
};

export const categoriesSlice = createSlice({
  name: 'categories',
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
    success: (state, action: PayloadAction<Category[]>) => {
      state.data = action.payload;
      state.pending = false;
    },
    setActive: (state, action: PayloadAction<Category>) => {
      state.data = state.data.map((e) => {
        if (e.id === action.payload.id) {
          return {
            ...e,
            selected: true,
          };
        }
        return {
          ...e,
          selected: false,
        };
      });
    },
    removeActive: (state) => {
      state.data = state.data.map((e) => {
        return {
          ...e,
          selected: false,
        };
      });
    },
  },
});

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const fetchCategories = (): AppThunk => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch(categoriesSlice.actions.request());
      const categories: Category[] = await categoriesService.fetchCategories();
      let mappedCategories = categories.map((e) => ({ ...e, selected: false }));
      dispatch(categoriesSlice.actions.success(mappedCategories));
      resolve(mappedCategories);
    } catch (error) {
      reject(error);
    }
  });
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCategories = (state: RootState) => state.categories.data;
export const selectedCategoriesPendingState = (state: RootState) =>
  state.categories.pending;
export const selectSelectedCategory = (state: RootState) =>
  state.categories.data.find((e) => e.selected);

export default categoriesSlice.reducer;
