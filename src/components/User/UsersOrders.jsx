import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Button, Spinner, Row, Col, Image } from 'react-bootstrap';
import { getUser } from '../ApiService/ApiService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UsersOrders = () => {
  const [userOrders, setUserOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userDetails = await getUser();
        setUser(userDetails);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []);

  const fetchUserOrders = async () => {
    try {
      const id = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      const response = await axios.get(`/order/myorder/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setUserOrders(response.data);
      } else {
        console.error('Unexpected error while fetching user orders.');
      }
    } catch (error) {
      console.error('Error fetching user orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserOrders();
  }, []);

  const handleCancelOrder = async (orderId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`/order/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        // Order cancelled successfully
        // You may want to update the UI to reflect the cancelled order
        console.log('Order cancelled successfully');
        // Show success toast
        toast.success('Order cancelled successfully');
        // Refetch user orders to update the list
        fetchUserOrders();
      } else {
        console.error('Unexpected error while cancelling order.');
      }
    } catch (error) {
      console.error('Error cancelling order:', error);
    }
  };

  return (
    <Container className="mt-5">
      <h1 className="mb-4">User Orders</h1>
      <ToastContainer />
      {loading ? (
        <Container className="d-flex justify-content-center align-items-center vh-100">
          <Spinner animation="border" role="status" variant="primary"></Spinner>
        </Container>
      ) : userOrders.length ? (
        userOrders.map(order => (
          <div key={order._id} className="border mb-4 p-3">
            <Row className="align-items-center">
              <Col xs={12} md={8}>
                <div>
                  <h5>Order ID: {order._id}</h5>
                  {user && (
                    <p><strong>User:</strong> {user.firstName} {user.lastName}</p>
                  )}
                  {order.shippingInfo && (
                    <div>
                      <p><strong>Shipping Address:</strong></p>
                      <p>{order.shippingInfo.address}</p>
                      <p>{order.shippingInfo.city}, {order.shippingInfo.country}, {order.shippingInfo.postalCode}</p>
                      <p><strong>Phone:</strong> {order.shippingInfo.phoneNo}</p>
                    </div>
                  )}
                </div>
              </Col>
              <Col xs={12} md={4} className="text-md-right mt-3 mt-md-0">
                <div>
                  <p><strong>Total Price:</strong><span style={{ color: 'green' }}>${order.totalPrice.toFixed(2)}</span> </p>
                  <p><strong>Shipping Status:</strong> <span style={{ color: 'green' }}>Your order is ready to ship</span></p>
                  <p><strong>Payment Status:</strong> <span style={{ color: 'green' }}>Success</span></p>
                </div>
              </Col>
            </Row>
            <hr />
            {order.items.map((item, index) => (
              <div key={index} className="mb-3">
                <Row className="align-items-center">
                  <Col xs={12} sm={4} className="text-center mb-3 mb-sm-0">
                    {/* Product image */}
                    <Image src={item.product.imageUrl} alt="Product" thumbnail style={{ maxWidth: '120px' }} />
                  </Col>
                  <Col xs={12} sm={8}>
                    {/* Product details */}
                    <div>
                      <p><strong>Product:</strong> {item.product.title}</p>
                      <p><strong>Price:</strong> ${item.product.price.toFixed(2)}</p>
                      <p><strong>Quantity:</strong> {item.quantity}</p>
                    </div>
                  </Col>
                </Row>
                {/* Line separator */}
                <hr />
              </div>
            ))}
            <Button variant="danger" className="float-md-right" onClick={() => handleCancelOrder(order._id)}>Cancel Order</Button>
          </div>
        ))
      ) : (
        <p>No orders found</p>
      )}
    </Container>
  );
};

export default UsersOrders;
