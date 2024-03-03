import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Skeleton from 'react-loading-skeleton';

const ProductDetail = ({ title, price, imageUrl, id, isNew }) => {
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000); // Simulating a delay to show the skeleton
  
      return () => clearTimeout(timer);
    }, []);
  
    return (
      <>
      <div className="col-sm-6 col-md-4 col-lg-3 col-lg-2 mt-4 mb-3 d-flex justify-content-evenly" >
         
        <div className="card card-2 h-100 text-center p-4" style={{ width: '280px' }}>
          {loading ? (
            <>
               <div className="col-sm-6 col-md-4 col-lg-3 col-lg">
              <Skeleton height={350}/>
          </div>
          <div className="col-sm-6 col-md-4 col-lg-3 col-lg">
              <Skeleton height={350}/>
          </div>
          <div className="col-sm-6 col-md-4 col-lg-3 col-lg">
              <Skeleton height={350}/>
          </div>
          <div className="col-sm-6 col-md-4 col-lg-3 col-lg">
              <Skeleton height={350}/>
          </div>
      </>
            
          ) : (
            <>
              {isNew &&(
                 <span className="badge bg-danger">New</span>)}
              <img src={imageUrl} className="card-img-top" alt={title} height="200px" />
              <div className="card-body">
                <h5 className="card-title mb-0">{title.substring(0, 12)}...</h5>
                <p className="card-text lead fw-bold">Price:<span>${price}</span></p>
                <NavLink to={`/product/${id}`} className="btn btn-warning" style={{ borderRadius: "0" }}>
                  View Details
                </NavLink>
              </div>
            </>
          )}
        </div>
      </div>
      </>
    );
  };
  

export default ProductDetail;
