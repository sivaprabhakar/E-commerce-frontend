import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutSteps = ({ step }) => {
    return (
        <div className="checkout-steps">
            <div className={`step-item ${step >= 1 ? 'active' : ''}`}>
            <Link to='/shipping'>
                <span className="step-number">1</span>
                <span className="step-label">Shipping Info</span>
                </Link>
            </div>
            <div className={`step-item ${step >= 2 ? 'active' : ''}`}>
            <Link to='/orderconfirm'>
                <span className="step-number">2</span>
                <span className="step-label">Confirm Order</span>
                </Link>
            </div>
           
            <div className={`step-item ${step === 3 ? 'active' : ''}`}>
            <Link to='/payment'>
                <span className="step-number">3</span>
                <span className="step-label">Payment</span>
                </Link>
            </div>
        </div>
    );
};

export default CheckoutSteps;
