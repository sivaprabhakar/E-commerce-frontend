// userSlice.js

import { createSlice } from '@reduxjs/toolkit';

const token = localStorage.getItem('token');

const initialState = {
  user: null,
  isAuthenticated: !!token,
  loading: false,
  error: null,
  token: token || null,
  userId: localStorage.getItem('userId') || null, // Initialize userId from localStorage
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInRequest(state) {
      state.loading = true;
      state.error = null;
    },
    signInSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.userId = action.payload.userId; // Store the user ID in the Redux state
    
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('userId', action.payload.userId); // Store userId in localStorage
    },
    signInFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.userId = null; // Clear userId from Redux state
      localStorage.removeItem('userId');
      localStorage.removeItem('token');
    },
  },
});

export const { signInRequest, signInSuccess, signInFailure, logout } = userSlice.actions;
export default userSlice.reducer;
