import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { getProductDetails } from "../ApiService/ApiService";
import { useDispatch } from "react-redux";
import { addToCart } from '../Redux/Slices/CartSlice';

const Products = ({ initialProduct }) => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    getProductDetails(id)
      .then((res) => {
        setProduct(res.product);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product details:", err);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    console.log("Add to Cart clicked");
  };

  return (
    <div className="container my-5">
      {loading ? (
        <Skeleton height={500} />
      ) : product !== null ? (
        <div className="row">
          <div className="col-md-6">
            <img src={product.imageUrl} alt={product.title} className="img-fluid" />
          </div>
          <div className="col-md-6">
            <h2>{product.title}</h2>
            <h4>Product Details:</h4>
            <p>{product.description}</p>
            <h3>Price${product.price}</h3>
            <div className="d-grid gap-2">
              <button className="btn btn-primary" onClick={handleAddToCart}>Add to Cart</button>
              <button className="btn btn-success" onClick={() => alert("Buy Now clicked")}>Buy Now</button>
            </div>
          </div>
        </div>
      ) : (
        <div>No product found</div>
      )}
    </div>
  );
};

export default Products;
