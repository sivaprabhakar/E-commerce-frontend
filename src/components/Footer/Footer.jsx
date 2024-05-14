import React from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

function Footer() {
  const location = useLocation();

  // Check if the current location is the home page
  const isHomePage = location.pathname === '/';

  // Render the footer only if it's the home page
  return isHomePage ? (
    <footer className="footer bg-dark text-white py-4">
      <Container>
        <Row>
          <Col md={4} className="mb-4">
            <h5>Company Information</h5>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <p><FaMapMarkerAlt /> 123 Street Name, City, Country</p>
            <p><FaPhone /> +1 234 567 890</p>
            <p><FaEnvelope /> info@example.com</p>
          </Col>
          <Col md={4} className="mb-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white">Home</a></li>
              <li><a href="#" className="text-white">Products</a></li>
              <li><a href="#" className="text-white">Services</a></li>
              <li><a href="#" className="text-white">Contact</a></li>
            </ul>
          </Col>
          <Col md={4} className="mb-4">
            <h5>Follow Us</h5>
            <ul className="list-inline">
              <li className="list-inline-item"><a href="#"><FaFacebook /></a></li>
              <li className="list-inline-item"><a href="#"><FaTwitter /></a></li>
              <li className="list-inline-item"><a href="#"><FaInstagram /></a></li>
              <li className="list-inline-item"><a href="#"><FaLinkedin /></a></li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  ) : null;
}

export default Footer;
