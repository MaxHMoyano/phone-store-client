import { Article } from '../../models/Shared';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { articlesService } from '../services/articlesService';

interface ArticlesState {
  pending: Boolean;
  error: Boolean;
  data: Article[];
}

const initialState: ArticlesState = {
  pending: false,
  error: false,
  data: [
    {
      price: 100,
      image:
        'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
      name: 'Primer articulo',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam facere itaque debitis quas esse? Molestias nostrum nam laborum maiores dolorem!',
      id: 'BFSN39N4BRsWV4vnyQJ2',
    },
    {
      price: 100,
      image:
        'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
      name: 'TEST',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam facere itaque debitis quas esse? Molestias nostrum nam laborum maiores dolorem!',
      id: 'HpjSdJtdHG5cla18MqN4',
    },
    {
      price: 100,
      image:
        'https://images.unsplash.com/photo-1517439270744-8d9287c2f8f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1292&q=80',
      name: 'ITEM 1',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam facere itaque debitis quas esse? Molestias nostrum nam laborum maiores dolorem!',
      id: 'MOYQoJeael8HG3U9g4wf',
    },
    {
      price: 100,
      image:
        'https://images.unsplash.com/photo-1545947597-7975c1d364eb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',
      name: 'ITEM 1',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam facere itaque debitis quas esse? Molestias nostrum nam laborum maiores dolorem!',
      id: 'VNFchIsYeVwkimOJ5eMT',
    },
    {
      name: 'ITEM 1',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam facere itaque debitis quas esse? Molestias nostrum nam laborum maiores dolorem!',
      price: 100,
      image:
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',
      id: 'nO5VWMlE2SfLL63uZlhb',
    },
    {
      name: 'ITEM 1',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam facere itaque debitis quas esse? Molestias nostrum nam laborum maiores dolorem!',
      price: 100,
      image:
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',
      id: 'nO5VWMlE2SfLL63uZlhb',
    },
    {
      name: 'ITEM 1',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam facere itaque debitis quas esse? Molestias nostrum nam laborum maiores dolorem!',
      price: 100,
      image:
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',
      id: 'nO5VWMlE2SfLL63uZlhb',
    },
    {
      name: 'ITEM 1',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam facere itaque debitis quas esse? Molestias nostrum nam laborum maiores dolorem!',
      price: 100,
      image:
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',
      id: 'nO5VWMlE2SfLL63uZlhb',
    },
    {
      name: 'ITEM 1',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam facere itaque debitis quas esse? Molestias nostrum nam laborum maiores dolorem!',
      price: 100,
      image:
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',
      id: 'nO5VWMlE2SfLL63uZlhb',
    },
    {
      name: 'ITEM 1',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam facere itaque debitis quas esse? Molestias nostrum nam laborum maiores dolorem!',
      price: 100,
      image:
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',
      id: 'nO5VWMlE2SfLL63uZlhb',
    },
    {
      name: 'ITEM 1',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam facere itaque debitis quas esse? Molestias nostrum nam laborum maiores dolorem!',
      price: 100,
      image:
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',
      id: 'nO5VWMlE2SfLL63uZlhb',
    },
    {
      name: 'ITEM 1',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam facere itaque debitis quas esse? Molestias nostrum nam laborum maiores dolorem!',
      price: 100,
      image:
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',
      id: 'nO5VWMlE2SfLL63uZlhb',
    },
    {
      name: 'ITEM 1',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam facere itaque debitis quas esse? Molestias nostrum nam laborum maiores dolorem!',
      price: 100,
      image:
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',
      id: 'nO5VWMlE2SfLL63uZlhb',
    },
    {
      name: 'ITEM 1',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam facere itaque debitis quas esse? Molestias nostrum nam laborum maiores dolorem!',
      price: 100,
      image:
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',
      id: 'nO5VWMlE2SfLL63uZlhb',
    },
  ],
};

export const articlesSlice = createSlice({
  name: 'articles',
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
    success: (state, action: PayloadAction<Article[]>) => {
      state.data = action.payload;
    },
  },
});

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const fetchArticles = (): AppThunk => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch(articlesSlice.actions.request());
      const articles: Article[] = await articlesService.fetchRates();
      dispatch(articlesSlice.actions.success(articles));
      resolve(articles);
    } catch (error) {
      reject(error);
    }
  });
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectArticles = (state: RootState) => state.articles.data;

export default articlesSlice.reducer;
