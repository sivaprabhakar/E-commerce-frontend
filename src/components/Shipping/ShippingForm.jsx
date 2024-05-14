import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Spinner } from 'react-bootstrap';
import CheckoutSteps from './CheckOut';
import { useNavigate } from 'react-router-dom';
import Header from "../Header/Header";
const ShippingForm = () => {
    const initialShippingInfo = JSON.parse(localStorage.getItem('shippingInfo')) || {
        address: '',
        country: '',
        city: '',
        phoneNo: '',
        postalCode: ''
    };
    
    const [shippingInfo, setShippingInfo] = useState(initialShippingInfo);
    const [loading, setLoading] = useState(true); // Set loading to true initially
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setShippingInfo({
            ...shippingInfo,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true when form is submitted
        localStorage.setItem('shippingInfo', JSON.stringify(shippingInfo));
        // Simulate async operation (replace this with your actual API call)
        setTimeout(() => {
            setLoading(false); // Set loading to false after the operation is complete
            navigate('/orderconfirm');
            console.log('Shipping Info:', shippingInfo);
        }, 1000); // Simulate a 1 second delay
    };

    // Set loading to false after a delay when the component mounts
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000); // Set the delay to your preference

        // Clean up the timer on component unmount
        return () => clearTimeout(timer);
    }, []);

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
            <CheckoutSteps step={1} />
            <Container>
                <Row className="justify-content-center">
                    <Col xs={12} md={8}>
                        <h2 className="text-center">Shipping Address</h2>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formAddress">
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="address"
                                    value={shippingInfo.address}
                                    onChange={handleChange}
                                    required
                                    className="custom-input"
                                />
                            </Form.Group>
                            <Form.Group controlId="formCountry">
                                <Form.Label>Country</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="country"
                                    value={shippingInfo.country}
                                    onChange={handleChange}
                                    required
                                    className="custom-input"
                                />
                            </Form.Group>

                            <Form.Group controlId="formCity">
                                <Form.Label>City</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="city"
                                    value={shippingInfo.city}
                                    onChange={handleChange}
                                    required
                                    className="custom-input"
                                />
                            </Form.Group>

                            <Form.Group controlId="formPhoneNo">
                                <Form.Label>Phone No</Form.Label>
                              <Form.Control
                                    type="tel"
                                    name="phoneNo"
                                    value={shippingInfo.phoneNo}
                                    onChange={handleChange}
                                    required
                                    className="custom-input"
                                />
                            </Form.Group>

                            <Form.Group controlId="formPostalCode">
                                <Form.Label>Postal Code</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="postalCode"
                                    value={shippingInfo.postalCode}
                                    onChange={handleChange}
                                    required
                                    className="custom-input"
                                />
                            </Form.Group>
                            <Button
                                variant="primary"
                                type="submit"
                                className="submit-button"
                                disabled={loading}
                            >
                                Submit
                            </Button>

                           
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default ShippingForm;