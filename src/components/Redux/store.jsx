import { configureStore } from "@reduxjs/toolkit";
import cartReducer from '../Redux/Slices/CartSlice';
import userReducer from '../Redux/Slices/UserSlice';
import productReducer from '../Redux/Slices/ProductSlice';
import orderReducer from '../Redux/Slices/OrderSlice';

const rootReducer = {
    cart: cartReducer,
    user: userReducer,
    products: productReducer,
    orders: orderReducer,
  };
export const store = configureStore({
    reducer:{rootReducer}
})