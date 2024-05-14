import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import Header from "../Header/Header";

function GiftCardsPage() {
  return (
    <>
    
    <Container className="my-5">
      <Row className="justify-content-center align-items-center">
        <Col xs={12} md={6} className="text-center">
          <FontAwesomeIcon icon={faClock} size="5x" className="text-secondary mb-4" />
          <h2 className="mb-3">Gift Cards</h2>
          <p>Stay tuned for the gift cards section!</p>
        </Col>
      </Row>
    </Container>
    </>
  );
}

export default GiftCardsPage;
