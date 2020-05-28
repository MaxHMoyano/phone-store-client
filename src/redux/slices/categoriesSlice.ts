import { Category } from '../../models/Shared';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

interface Categories {
  list: Category[];
}

const initialState: Categories = {
  list: [
    {
      name: 'Celulares',
      selected: true,
    },
    {
      name: 'Notebooks',
      selected: false,
    },
  ],
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
});

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCategories = (state: RootState) => state.categories.list;
export const selectSelectedCategory = (state: RootState) =>
  state.categories.list.find((e) => e.selected);

export default categoriesSlice.reducer;
