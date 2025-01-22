import { TOrder } from '@utils-types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getOrdersApi } from '../../utils/burger-api';

export type TOrdersState = {
  orders: TOrder[];
};

const initialState: TOrdersState = {
  orders: []
};

export const fetchOrders = createAsyncThunk('orders/getOrders', getOrdersApi);

export const ordersSlice = createSlice({
  name: 'ordersBurger',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
    });
  },
  selectors: {
    getOrders: (state) => state.orders
  }
});

export const { getOrders } = ordersSlice.selectors;

const ordersReducer = ordersSlice.reducer;
export default ordersReducer;
