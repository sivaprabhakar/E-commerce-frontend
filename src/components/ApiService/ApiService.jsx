// ApiService.js
import axios from "axios";
import { signInRequest, signInSuccess, signInFailure } from "../Redux/Slices/UserSlice";
import { addToCart as addToCartAction } from '../Redux/Slices/CartSlice'; 
import { setCartItems } from '../Redux/Slices/CartSlice';
import {removeFromCart as removeFromCartAction} from  '../Redux/Slices/CartSlice'; 
import {
  createOrderRequest,
  createOrderSuccess,
  createOrderFailure,
  updateOrderRequest,
  updateOrderSuccess,
  updateOrderFailure,
  deleteOrderRequest,
  deleteOrderSuccess,
  deleteOrderFailure,
} from '../Redux/Slices/OrderSlice';
export const getAllProducts = async () => {
  try {
    const res = await axios.get('/product');
    if (res.status !== 200) {
      console.log('No data');
      return null; // Or throw an error
    }
    const data = res.data;
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return null; // Or throw an error
  }
};

export const getProductDetails = async (id) => {
  try {
      const res = await axios.get(`/product/${id}`);
      
      return res.data;
  } catch (error) {
      console.error("Error fetching product details:", error);
      throw error;
  }
};

export const login = (formData) => async (dispatch) => {
  dispatch(signInRequest());
  try {
    const response = await axios.post('/user/login', formData);
    const { token,userId , userData } = response.data; // Assuming the backend returns token and userData which includes the user ID
    
    dispatch(signInSuccess({ user: userData, token, userId }));
  } catch (error) {
    dispatch(signInFailure(error.response.data.message));
  }
};


export const updateUser = async (userId, userData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(`/user/${userId}`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Return the updated user data
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : "Error updating user");
  }
};




export const searchProducts = async (query, category, sortBy, sortOrder, page = 1, limit = 10) => {
  try {
      const response = await axios.get(`/product/search`, {
          params: { query, category, sortBy, sortOrder, page, limit }
      });
      console.log("Search response:", response.data); // Add console log to check search response
      return response.data;
  } catch (error) {
      console.error('Error searching products:', error);
      throw error;
  }
};

export const addToCart = async (userId, productId, quantity, dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post('/cart/add', { userId, productId, quantity }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    dispatch(addToCartAction(response.data.cart[0])); // Dispatch addToCartAction with the updated cart item
    return response.data; // Return the entire response data
  } catch (error) {
    throw error; // Rethrow the error to be handled in the component
  }

};

export const getCartItems = (userId) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage
    const response = await axios.get(`/cart/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}` // Include the token in the request headers
      }
    });

    if (response && response.data && response.data.cart) {
      dispatch(setCartItems(response.data.cart)); // Assuming you have a setCartItems action
    } else {
      throw new Error("Cart data not found in the response");
    }
  } catch (error) {
    console.error("Error fetching cart items:", error);
    throw new Error(error.response ? error.response.data.message : "Error fetching cart items");
  }
};

export const removeFromCart = async (userId, productId) => {
  try {
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage
    const response = await axios.delete(`/cart`, { 
      headers: {
        'Authorization': `Bearer ${token}` // Include the token in the request headers
      },
      data: { userId, productId } // Include userId and productId in the request body
    });
    return response.data; // Return the response data
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : "Error removing product from cart");
  }
};
// Create an order
export const createOrder = (orderData) => async (dispatch) => {
  try {
    dispatch(createOrderRequest());
    const token = localStorage.getItem('token'); 
    const response = await axios.post('/order/neworder', orderData,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if(response.status===201)
    return  dispatch(createOrderSuccess(response.data.order));
   
  } catch (error) {
    dispatch(createOrderFailure(error.message));
  }
};


// Update an order
export const updateOrder = (orderId, orderData) => async (dispatch) => {
  try {
    dispatch(updateOrderRequest());
    const token = localStorage.getItem('token'); 
    const response = await axios.put(`/order/${orderId}`, orderData,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(updateOrderSuccess(response.data.order));
  } catch (error) {
    dispatch(updateOrderFailure(error.message));
  }
};

// Delete an order
export const deleteOrder = (orderId) => async (dispatch) => {
  try {
    dispatch(deleteOrderRequest());
    const token = localStorage.getItem('token'); 
    const response = await axios.delete(`/order${orderId}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(deleteOrderSuccess(response.data.order));
  } catch (error) {
    dispatch(deleteOrderFailure(error.message));
  }
};

// user detils 
export const getUser = async()=>{
  try{
  const id = localStorage.getItem("userId")
  const token = localStorage.getItem('token'); 
  const response =await axios.get(`/user/${id}`,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  if(response.status!==200){
    return console.log('unexpected error ')
  }
  const resData = await response.data
  return resData;
  }
  catch (error) {
    console.error("Error fetching user details :", error);
    throw new Error(error.response ? error.response.data.message : "Error fetching user details");
  }
}