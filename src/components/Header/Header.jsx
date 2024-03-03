import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Container, Offcanvas } from 'react-bootstrap';
import { FaSearch, FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Header() {
  const [expand, setExpand] = useState('md');

  return (
    <>
      {[expand].map((exp) => (
        <Navbar key={exp} expand={exp} className="bg-dark text-white mb-3" style={{ height: '80px' }}>
          <Container fluid>
            <Navbar.Brand as={Link} to="/" className="text-white"><h2>E-buy</h2></Navbar.Brand>

            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${exp}`} className="custom-toggle-button" />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${exp}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${exp}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${exp}`}>
                  e-Buy
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body className="bg-dark text-white">
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Form className="search-form">
                    <FormControl
                      type="search"
                      placeholder="Search"
                      className="me-2"
                      aria-label="Search"
                     
                    />
                    <Button variant="warning" className="searchicon"><FaSearch /></Button>
                  </Form>
                  <NavDropdown title="All Categories" id="basic-nav-dropdown" className="text-white white-dropdown-title">
                    <NavDropdown.Item href="#action">electronics</NavDropdown.Item>
                    <NavDropdown.Item href="#action">jewelery</NavDropdown.Item>
                    <NavDropdown.Item href="#action">men's clothing</NavDropdown.Item>
                    <NavDropdown.Item href="#action">women's clothing</NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link href="#action1" className="text-white">Today's Deals</Nav.Link>
                  <Nav.Link href="#action2" className="text-white"> WishLists</Nav.Link>
                  <Nav.Link href="#action3" className="text-white">Gift Cards</Nav.Link>
                  <Nav.Link as={Link} to='/signup' className="text-white">Register</Nav.Link>
                  <Button variant="light"><FaShoppingCart /></Button>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default Header;
