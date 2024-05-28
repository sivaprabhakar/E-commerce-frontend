import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const OrderSuccessPage = () => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        // Trigger animation after component mounts
        setShow(true);
    }, []);

    return (
        <div className={`order-success-container ${show ? 'show' : ''}`}>
            <Container className="h-100">
                <Row className="h-100 align-items-center justify-content-center">
                    <Col xs={12} md={8} lg={6}>
                        <div className="text-center">
                            <FontAwesomeIcon icon={faCheckCircle} size="5x" color="green" />
                            <h2 className="mt-3 text-green">Payment Success!</h2>
                            <h2 className="mt-3 ">Your order has been placed Successfully!</h2>
                            <p className="lead">Thank You for Shopping.</p>
                            <Link to="/userorders">
                            <Button variant="primary" >Go to Orders</Button>
                            </Link>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default OrderSuccessPage;
