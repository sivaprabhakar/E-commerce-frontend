import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import { getCartItems, removeFromCart } from "../ApiService/ApiService";
import { setCartItems } from '../Redux/Slices/CartSlice';
import { Link } from "react-router-dom";
import Header from "../Header/Header";

const Cart = () => {
  const [loading, setLoading] = useState(true);
  const [removeMessage, setRemoveMessage] = useState("");
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.userId);

  useEffect(() => {
    setLoading(true);
    getCartItems(userId)(dispatch)
      .then((cart) => {
        dispatch(setCartItems(cart));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching cart items:", error);
        setLoading(false);
      });
  }, [userId, dispatch]);

  const handleRemoveFromCart = async (productId) => {
    try {
      await removeFromCart(userId, productId);
      setRemoveMessage("Product removed from cart successfully");
      setTimeout(() => {
        setRemoveMessage("");
      }, 3000);

      // Fetch updated cart items
      getCartItems(userId)(dispatch)
        .then((cart) => {
          dispatch(setCartItems(cart));
        })
        .catch((error) => {
          console.error("Error fetching cart items:", error);
        });
    } catch (error) {
      console.error("Error removing product from cart:", error);
    }
  };

  const handleQuantityChange = (productId, newQuantity) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.product._id === productId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    dispatch(setCartItems(updatedCartItems));
  };

  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);

  const handleProceedToCheckout = () => {
    console.log("Proceeding to checkout...");
  };

  return (
    <Fragment>
      <Header />
      <div className="container my-5">
        <h2>Shopping Cart</h2>
        {loading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <Fragment>
            {removeMessage && <div className="alert alert-success">{removeMessage}</div>}
            <h2 className="mt-5">Your Cart: <b>{cartItems.length} items</b></h2>
            <div className="row d-flex justify-content-between">
              <div className="col-12 col-lg-8">
                {cartItems.map((item) => (
                  <Fragment key={item.product._id}>
                    <hr />
                    <div className="cart-item">
                      <div className="row align-items-center">
                        {/* Display product image and title */}
                        <div className="col-12 col-md-4 d-flex align-items-center">
                          <img
                            src={item.product.imageUrl}
                            alt={item.product.title}
                            height="90"
                            width="115"
                            className="img-fluid me-3"
                          />
                          <div>
                            <h5 className="card-title">{item.product.title}</h5>
                            <div className="d-flex align-items-center">
                              <span className="me-3">Quantity:</span>
                              <button
                                className="btn btn-outline-dark btn-sm me-2"
                                onClick={() => handleQuantityChange(item.product._id, item.quantity - 1)}
                              >
                                <FaMinus />
                              </button>
                              <span>{item.quantity}</span>
                              <button
                                className="btn btn-outline-dark btn-sm me-2"
                                onClick={() => handleQuantityChange(item.product._id, item.quantity + 1)}
                              >
                                <FaPlus />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Display price and remove button */}
                        <div className="col-12 col-md-4 d-flex justify-content-end align-items-center">
                          <div className="d-flex flex-column align-items-end">
                            <p className="card-text fs-5 m-0">${item.product.price.toFixed(2)}</p>
                            <button
                              className="btn btn-sm btn-danger ms-3 mt-1"
                              onClick={() => handleRemoveFromCart(item.product._id)}
                              style={{ width: '50px' }}
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Fragment>
                ))}
                <hr />
              </div>
              <div className="col-12 col-lg-3 my-4">
                <div id="order_summary">
                  <h4>Order Summary</h4>
                  <hr />
                  <p>Subtotal: <span className="order-summary-values">{cartItems.reduce((acc, item) => acc + item.quantity, 0)} units</span></p>
                  <p>Est. total: <span className="order-summary-values">${totalPrice.toFixed(2)}</span></p>
                  <hr />
                  <Link to="/shipping">
                  <button
                    id="checkout_btn"
                    className="btn btn-primary btn-block"
                    onClick={handleProceedToCheckout}
                    style={{ backgroundColor: '#007bff', border: 'none', cursor: 'pointer' }}
                  >
                    Check out
                  </button>
                  </Link>
                </div>
              </div>
            </div>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default Cart;
