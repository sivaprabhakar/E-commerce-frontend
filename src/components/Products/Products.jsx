import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { getProductDetails, addToCart } from "../ApiService/ApiService";
import { useDispatch, useSelector } from "react-redux";
import { FaCartPlus, FaShoppingCart } from 'react-icons/fa';
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const { id } = useParams();
  
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [successMessage, setSuccessMessage] = useState("");
  const [addToCartHover, setAddToCartHover] = useState(false);
  const [buyNowHover, setBuyNowHover] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const userId = useSelector(state => state.user.userId);
  const cartItems = useSelector(state => state.cart.cartItems) || [];
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setError(null);

    getProductDetails(id)
      .then((res) => {
        if (res && res.product) {
          setProduct(res.product);
        } else {
          setError("No product found.");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching product details. Please try again.");
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = async () => {
    try {
      if (!product) {
        console.error("Product not found");
        return;
      }

      if (!userId) {
        navigate('/signin'); 
        return;
      }

      await addToCart(userId, product._id, quantity, dispatch);
      setSuccessMessage("Product added to cart successfully");

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      handleAddToCartError(error);
    }
  };

  const handleAddToCartError = (error) => {
    if (error.response) {
      if (error.response.status === 400) {
        setErrorMessage("Product already in cart");
      } else if (error.response.status === 401) {
        setErrorMessage("Please sign in to add product to cart");
      } else {
        setErrorMessage("Error adding product to cart. Please try again.");
      }
    } else {
      console.error("Error adding product to cart:", error);
      setErrorMessage("Error adding product to cart. Please try again.");
    }
  };

  const handleBuyNow = () => {
    if (!userId) {
      navigate('/signin');
      return;
    }

    // If the user is signed in, you can add the product to the cart and then navigate to the checkout page.
    // You might want to add the product to the cart before navigating to checkout.
    navigate('/shipping');
  };

  const handleQuantityChange = (value) => {
    setQuantity(quantity + value > 0 ? quantity + value : 1);
  };

  return (
    <>
      <Header />
      <div className="container my-5">
        {loading ? (
          <Skeleton height={700} />
        ) : error ? (
          <div>Error: {error}</div>
        ) : product ? (
          <div className="row">
            <div className="col-md-6">
              <img src={product.imageUrl} alt={product.title} className="img-fluid rounded mb-4" style={{ maxHeight: '400px' }} />
            </div>
            <div className="col-md-6">
              <h2 className="mb-3">{product.title}</h2>
              <p className="mb-4">{product.description}</p>
              <div className="mb-4">
                <h5>Price: <span className="text-primary">${product.price}</span></h5>
                <div className="d-flex align-items-center mt-3">
                  <span className="me-3">Quantity:</span>
                  <button
                    className="btn btn-outline-dark me-2"
                    onClick={() => handleQuantityChange(-1)}
                  >
                    -
                  </button>
                  <span>{quantity}</span>
                  <button
                    className="btn btn-outline-dark ms-2"
                    onClick={() => handleQuantityChange(1)}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="d-grid gap-2">
                {successMessage && (
                  <div className="alert alert-success mb-3">
                    {successMessage}
                  </div>
                )}

                {errorMessage && (
                  <div className="alert alert-danger mb-3">
                    {errorMessage}
                  </div>
                )}

                <button
                  className="btn btn-lg"
                  style={{
                    backgroundColor: addToCartHover ? '#e0c815' : '#f8d41f',
                    borderColor: addToCartHover ? '#e0c815' : '#f8d41f'
                  }}
                  onMouseEnter={() => setAddToCartHover(true)}
                  onMouseLeave={() => setAddToCartHover(false)}
                  onClick={handleAddToCart}
                >
                  <FaCartPlus className="me-2" /> Add to Cart
                </button>
                
                <button
                  className="btn btn-lg mt-3"
                  style={{
                    backgroundColor: buyNowHover ? '#ff7300' : '#ff9900',
                    borderColor: buyNowHover ? '#ff7300' : '#ff9900'
                  }}
                  onMouseEnter={() => setBuyNowHover(true)}
                  onMouseLeave={() => setBuyNowHover(false)}
                  onClick={handleBuyNow}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div>No product found</div>
        )}
      </div>
    </>
  );
};

export default Products;
