import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import Header from "../Header/Header";

function TodaysDealsPage() {
  
  const deals = [];

  return (
    <>
   <Header/>
    <Container className="my-5 d-flex align-items-center justify-content-center">
      <Row xs={1} md={2} lg={3} className="g-4">
        {deals.length === 0 ? (
          <Col>
            <Card className="text-center" style={{ width: '18rem' }}>
              <Card.Body>
                <FontAwesomeIcon icon={faClock} size="5x" className="text-secondary mb-3" />
                <Card.Title>Coming Soon</Card.Title>
                <Card.Text>
                  Stay tuned for exciting deals!
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ) : (
          deals.map(deal => (
            <Col key={deal.id}>
              <Card style={{ width: '18rem' }}>
               
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
    </>
  );
}

export default TodaysDealsPage;
