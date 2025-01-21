import { combineReducers } from '@reduxjs/toolkit';
import { ingredientsSlice } from './slices/ingredientsSlice';
import { constructorSlice } from './slices/constructorSlice';
import { userSlice } from './slices/userSlice';
import { feedsSlice } from './slices/feedsSlice';
import { orderSlice } from './slices/orderSlice';
import { ordersSlice } from './slices/ordersSlice';

export const rootReducer = combineReducers({
  ingredientsBurger: ingredientsSlice.reducer,
  constructorBurger: constructorSlice.reducer,
  userBurger: userSlice.reducer,
  feedsBurger: feedsSlice.reducer,
  orderBurger: orderSlice.reducer,
  ordersBurger: ordersSlice.reducer
});

export default rootReducer;
