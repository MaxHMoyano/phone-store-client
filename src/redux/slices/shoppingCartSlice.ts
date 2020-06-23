import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { Subarticle, Item } from '../../models/Shared';

interface ShoppingCart {
  active: Boolean;
  articles: Item[];
  recentlyAdded: Subarticle[];
}

const initialState: ShoppingCart = {
  active: false,
  articles: [],
  recentlyAdded: [],
};

export const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {
    toggleShoppingCart: (state, action: PayloadAction<Boolean>) => {
      if (action.payload) {
        state.active = action.payload;
      } else {
        state.active = !state.active;
      }
    },
    addArticleToShoppingCart: (state, action: PayloadAction<Subarticle>) => {
      let idx = state.articles.findIndex(
        (e) => e.subarticle === action.payload.id
      );

      if (idx === -1) {
        state.articles.push({
          subarticle: action.payload.id,
          quantity: 1,
          name: action.payload.name,
        });
      } else {
        state.articles[idx].quantity += 1;
      }
      state.recentlyAdded.push(action.payload);
    },
    removeArticleFromShoppingCart: (state, action: PayloadAction<Item>) => {
      state.articles = state.articles.filter(
        (e) => e.subarticle !== action.payload.subarticle
      );
    },
    removeArticleFromRecentlyAdded: (
      state,
      action: PayloadAction<Subarticle>
    ) => {
      let idx = state.recentlyAdded.findIndex(
        (e) => e.id === action.payload.id
      );
      state.recentlyAdded.splice(idx, 1);
    },
    changeItemQuantity: (state, action: PayloadAction<Item>) => {
      let idx = state.articles.findIndex(
        (e) => e.subarticle === action.payload.subarticle
      );
      state.articles[idx] = {
        ...action.payload,
      };
    },
  },
});

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const addArticleToShoppingCart = (subarticle: Subarticle): AppThunk => (
  dispatch
) => {
  dispatch(shoppingCartSlice.actions.addArticleToShoppingCart(subarticle));
  setTimeout(() => {
    dispatch(
      shoppingCartSlice.actions.removeArticleFromRecentlyAdded(subarticle)
    );
  }, 1500);
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const shoppingCartStateSelector = (state: RootState) =>
  state.shoppingCart.active;
export const shoppingCartArticlesCountSelector = (state: RootState) =>
  state.shoppingCart.articles.length;
export const shoppingCartArticlesSelector = (state: RootState) =>
  state.shoppingCart.articles;
export const shoppingCartRecentlyAddedArticlesSelector = (state: RootState) =>
  state.shoppingCart.recentlyAdded;

export default shoppingCartSlice.reducer;
