import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Container, Offcanvas } from 'react-bootstrap';
import { FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { useSelector } from 'react-redux';

function Header({ handleSearch, onSelectCategory }) {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const handleCategoryClick = (category) => {
    onSelectCategory(category);
  };
  const [searchQuery, setSearchQuery] = useState('');
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  const [expand, setExpand] = useState('md');

  const onSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  const handleCartClick = () => {
    // Check if the user is authenticated
    if (!isAuthenticated) {
      // If not authenticated, navigate to the sign-in page
      navigate('/signin');
    } else {
      // If authenticated, navigate to the cart page
      navigate('/cart');
    }
  };

  return (
    <>
      {[expand].map((exp) => (
        <Navbar key={exp} expand={exp} className="bg-dark text-white mb-3 sticky-top" style={{ height: '80px' }}>
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
                  <Form className="search-form d-flex" onSubmit={onSubmit}>
                    <FormControl
                      type="search"
                      placeholder="Search"
                      className="mr-2"
                      aria-label="Search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Button variant="warning" type="submit" className="searchicon"><FaSearch /></Button>
                  </Form>
                  <NavDropdown title="All Categories" id="basic-nav-dropdown" className="text-white white-dropdown-title">
                    <NavDropdown.Item onClick={() => handleCategoryClick('electronics')}>electronics</NavDropdown.Item>
                    <NavDropdown.Item onClick={() => handleCategoryClick('jewelery')}>jewelery</NavDropdown.Item>
                    <NavDropdown.Item onClick={() => handleCategoryClick("men's clothing")}>men's clothing</NavDropdown.Item>
                    <NavDropdown.Item onClick={() => handleCategoryClick("women's clothing")}>women's clothing</NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link as={Link} to='/todaysdeal' className="text-white">Today's Deals</Nav.Link>
                  <Nav.Link href="#action2" className="text-white"> WishLists</Nav.Link>
                  <Nav.Link href="/giftcard" className="text-white">Gift Cards</Nav.Link>
                  {isAuthenticated ? (
                    <Nav.Link as={Link} to='/profile' className="text-white">
                      <FaUser />
                    </Nav.Link>
                  ) : (
                    <Nav.Link as={Link} to='/signup' className="text-white">
                      Register
                    </Nav.Link>
                  )}
                  <Button variant="light" className="cart" onClick={handleCartClick}><FaShoppingCart className="cart" /></Button>
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
