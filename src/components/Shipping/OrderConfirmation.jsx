import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Image, Spinner } from 'react-bootstrap';
import axios from 'axios';
import CheckoutSteps from './CheckOut';
import { useNavigate } from 'react-router-dom';
import Header from "../Header/Header";
const ConfirmOrder = () => {
    const [user, setUser] = useState({});
    const [cart, setCart] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [shippingInfo, setShippingInfo] = useState({});
    const [loading, setLoading] = useState(true);
    const [step, setStep] = useState(2); 
    const navigate =useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = localStorage.getItem('userId');
                const token = localStorage.getItem('token');
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                const userResponse = await axios.get(`/user/${userId}`);
                setUser(userResponse.data);

                const shippingInfoFromStorage = JSON.parse(localStorage.getItem('shippingInfo'));
                setShippingInfo(shippingInfoFromStorage);

                const cartResponse = await axios.get(`/cart/${userId}`);
                setCart(cartResponse.data.cart);

                let total = 0;
                let itemsCount = 0;
                cartResponse.data.cart.forEach(item => {
                    total += item.product.price * item.quantity;
                    itemsCount += item.quantity;
                });
                setTotalAmount(total);
                setTotalItems(itemsCount);

                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleProceedToPayment = () => {
        // Save data to session storage
        const orderInfo = {
            user,
            cart,
            totalAmount,
            totalItems,
            shippingInfo
        };
        sessionStorage.setItem('orderInfo', JSON.stringify(orderInfo));

        // Redirect to payment page
        navigate('/payment');
    };

    if (loading) {
        return (
            <Container className="d-flex justify-content-center align-items-center vh-100">
                <Spinner animation="border" role="status" variant="primary">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Container>
        );
    }

    return (
        <>
        <Header/>
            <CheckoutSteps step ={step}/>
            <Container>
                <Row className="mt-4">
                    <Col>
                        <h2 className="fw-bold text-center ">Confirm Your Order</h2>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col xs={12} md={8}>
                        <h4 className="text-secondary">Order Summary</h4>
                        {cart.map(item => (
                            <div key={item.product._id} className="mb-3 p-3 border">
                                <Row>
                                    <Col xs={4} md={3}>
                                        <Image className='confirmImage' src={item.product.imageUrl} alt={item.product.title} thumbnail />
                                    </Col>
                                    <Col xs={8} md={9}>
                                        <p className="mb-1"><strong>{item.product.title}</strong></p>
                                        <p className="mb-1 text-muted">Quantity: {item.quantity}</p>
                                        <p className="mb-0"><strong>Price:</strong> ${item.product.price}</p>
                                    </Col>
                                </Row>
                            </div>
                        ))}
                    </Col>
                    <Col xs={12} md={4}>
                        <div className="border p-3">
                            <h4 className="text-secondary">Shipping Details</h4>
                            <p className="mb-1"><span className="fw-bold">Name:</span> {user.firstName} {user.lastName}</p>
                            <p className="mb-0">
                                <span className="fw-bold">Address:</span> {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.country} - {shippingInfo.postalCode}
                            </p>
                            <p className="mb-0"><span className="fw-bold">Phone:</span> {shippingInfo.phoneNo}</p>
                        </div>
                        <div className="mt-3">
                            <p className="fw-bold">Total Items: {totalItems}</p>
                            <p className="fw-bold">Total Amount: ${totalAmount}</p>
                            <Button className="mt-3 w-100" variant="primary" onClick={handleProceedToPayment}>Proceed to Payment</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default ConfirmOrder;
