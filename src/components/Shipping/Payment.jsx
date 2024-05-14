import React, { useState, useEffect } from 'react';
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useDispatch } from 'react-redux'; // Import useDispatch hook
import { createOrder } from '../ApiService/ApiService'; 
import CheckoutSteps from './CheckOut';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Header from "../Header/Header";
const PaymentForm = () => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({});
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch(); 
     const navigate = useNavigate()
    const userId = localStorage.getItem('userId');
    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
    const shippingInfo = orderInfo ? orderInfo.shippingInfo : null; // Check if orderInfo exists before accessing shippingInfo
    const cartItems = orderInfo ? orderInfo.cart : []; // Retrieve cart items from session storage

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userId = localStorage.getItem('userId');
                const token = localStorage.getItem('token');
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const userResponse = await axios.get(`/user/${userId}`);
                setUser(userResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        }
        fetchUser();
    }, []);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        try {
            const paymentData = {
                amount: Math.round(orderInfo.totalAmount * 100),
                shipping: {
                    name: `${user.firstName} ${user.lastName}`,
                    address: {
                        city: shippingInfo ? shippingInfo.city : '',
                        postal_code: shippingInfo ? shippingInfo.postalCode : '',
                        country: shippingInfo ? shippingInfo.country : '',
                        
                        line1: shippingInfo ? shippingInfo.address : ''
                    },
                    phone: shippingInfo ? shippingInfo.phoneNo : ''
                },
                items: cartItems // Include cart items in the order data
            };

            const { data: { clientSecret } } = await axios.post('/payment/create-payment', paymentData);

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: `${user.firstName} ${user.lastName}`,
                        email: user.email
                    },
                },
            });
    
            if (result.error) {
                console.error('Payment failed:', result.error);
                toast.error(result.error.message); // Show error message using React Toastify
            } else {
                console.log('Payment succeeded:', result.paymentIntent);
                toast.success('Payment successful!'); // Show success message using React Toastify
                console.log('Creating Order Data:', { userId, items: cartItems, shippingInfo });
                dispatch(createOrder({ userId, items: cartItems, shippingInfo }));
                navigate('/ordersucess')

            }
        } catch (error) {
            console.error('Error processing payment:', error);
            toast.error('Error processing payment. Please try again later.'); // Show generic error message using React Toastify
        }
    
        setLoading(false);
    };

    return (
        <>
        <Header/>
         <CheckoutSteps step={3} />
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col xs={12} md={8} lg={6}>
                    <div className="payment-form bg-light rounded p-4 shadow">
                        <h3 className="text-center mb-4">Secure Payment</h3>
                        <hr/>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Card Number</Form.Label>
                                <CardNumberElement className="form-control" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Expiration Date</Form.Label>
                                <CardExpiryElement className="form-control" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>CVC</Form.Label>
                                <CardCvcElement className="form-control" />
                            </Form.Group>
                            <div className="d-flex justify-content-center">
                            <Button 
                                variant="primary" 
                                type="submit" 
                                disabled={!stripe || loading} 
                                className="w-auto mt-3 payment-button" 
                            >
                                {loading ? <Spinner animation="border" size="sm" /> : <span>Pay Now <span className="amount-text">{` $${orderInfo && orderInfo.totalAmount}`}</span></span>}
                            </Button>
                            </div>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
        <ToastContainer position="top-center" /> 
        </>
    );
};

export default PaymentForm;
