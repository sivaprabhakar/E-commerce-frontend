import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the order slice
const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchOrdersRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchOrdersSuccess(state, action) {
      state.orders = action.payload;
      state.loading = false;
    },
    fetchOrdersFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    createOrderRequest(state) {
      state.loading = true;
      state.error = null;
    },
    createOrderSuccess(state, action) {
      state.orders.push(action.payload);
      state.loading = false;
    },
    createOrderFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    updateOrderRequest(state) {
      state.loading = true;
      state.error = null;
    },
    updateOrderSuccess(state, action) {
      const updatedOrder = action.payload;
      const index = state.orders.findIndex(order => order._id === updatedOrder._id);
      if (index !== -1) {
        state.orders[index] = updatedOrder;
      }
      state.loading = false;
    },
    updateOrderFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    deleteOrderRequest(state) {
      state.loading = true;
      state.error = null;
    },
    deleteOrderSuccess(state, action) {
      const deletedOrderId = action.payload;
      state.orders = state.orders.filter(order => order._id !== deletedOrderId);
      state.loading = false;
    },
    deleteOrderFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  fetchOrdersRequest,
  fetchOrdersSuccess,
  fetchOrdersFailure,
  createOrderRequest,
  createOrderSuccess,
  createOrderFailure,
  updateOrderRequest,
  updateOrderSuccess,
  updateOrderFailure,
  deleteOrderRequest,
  deleteOrderSuccess,
  deleteOrderFailure,
} = orderSlice.actions;

export default orderSlice.reducer;
