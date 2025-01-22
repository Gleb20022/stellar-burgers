import { TOrder } from '@utils-types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { orderBurgerApi } from '../../utils/burger-api';

export type TOrderState = {
  orderModalData: TOrder | null;
  orderRequest: boolean;
  error: string | null;
};

const initialState: TOrderState = {
  orderModalData: null,
  orderRequest: false,
  error: null
};

export const fetchOrder = createAsyncThunk('order/fetchOrder', orderBurgerApi);

export const orderSlice = createSlice({
  name: 'orderBurger',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.orderModalData = null;
      state.orderRequest = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.orderModalData = action.payload.order;
        state.orderRequest = false;
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message || 'Ошибка получения заказа';
      })
      .addCase(fetchOrder.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      });
  },
  selectors: {
    getorderModalData: (state) => state.orderModalData,
    getOrderRequest: (state) => state.orderRequest
  }
});

export const { clearOrder } = orderSlice.actions;

export const { getorderModalData, getOrderRequest } = orderSlice.selectors;

const orderReducer = orderSlice.reducer;
export default orderReducer;
