import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.find(item => item.product === newItem.product);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.push({ ...newItem, quantity: 1 });
      }
    },
    removeFromCart(state, action) {
      const id = action.payload;
      return state.filter(item => item.product !== id);
    },
    updateQuantity(state, action) {
      const { productId, quantity } = action.payload;
      const item = state.find(item => item.product === productId);
      if (item) {
        item.quantity = quantity;
      }
    },
    setCartItems(state, action) {
      return action.payload; // Update cart items in the state
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, setCartItems } = cartSlice.actions;
export default cartSlice.reducer;
