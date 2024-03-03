import { createSlice } from '@reduxjs/toolkit';

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
    },
    fetchOrdersSuccess(state, action) {
      state.orders = action.payload;
      state.loading = false;
    },
    fetchOrdersFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { fetchOrdersRequest, fetchOrdersSuccess, fetchOrdersFailure } = orderSlice.actions;
export default orderSlice.reducer;
