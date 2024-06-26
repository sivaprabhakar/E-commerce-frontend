import React, { useState, useEffect } from 'react';
import { Carousel, Container, Button, Row, Col, Spinner } from 'react-bootstrap';
import ProductDetail from './Products/ProductDetails';
import Header from './Header/Header';
import { searchProducts, getAllProducts } from './ApiService/ApiService';
import image1 from '../assets/images/i watch 800.jpg';
import image2 from '../assets/images/image-800x400 (1).jpg';
import image3 from '../assets/images/image-800x400 (2).jpg';

function Home() {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state
  const [showCarousel, setShowCarousel] = useState(true); // State to control carousel visibility
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSearch = async (searchQuery) => {
    try {
      setLoading(true); // Start loading spinner
      console.log('Searching for:', searchQuery);
      const result = await searchProducts(searchQuery);
      console.log('Search result:', result);
      setSearchResults(result);
      setShowCarousel(false); // Hide carousel when search results are available
      setLoading(false); // Stop loading spinner
    } catch (error) {
      console.error('Error searching products:', error);
      setLoading(false); // Stop loading spinner even if there's an error
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // Start loading spinner
      try {
        if (selectedCategory) {
          // If a category is selected, search products based on the category
          const result = await searchProducts('', selectedCategory);
          setSearchResults(result);
        } else {
          // If no category is selected, fetch all products
          const data = await getAllProducts();
          if (data && data.Products) {
            setSearchResults(data.Products);
          } else {
            console.error('Error fetching products: Invalid data format');
          }
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false); // Stop loading spinner
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  return (
    <>
      <Header handleSearch={handleSearch} onSelectCategory={setSelectedCategory} />
      {showCarousel && (
        <Carousel className="cars">
          <Carousel.Item>
            <div className="d-block w-100 position-relative">
              <img
                className="d-block"
                src={image1}
                alt="i watch"
                style={{ height: '500px', width: '90%', margin: '0 auto' }}
              />
              <Container className="carousel-caption-container position-absolute top-50 start-0 translate-middle-y ps-3">
                <Row>
                  <Col md={6}>
                    <h1 className="fs-2">Watch 7 series</h1>
                    <p className="fs-5"> starting from $500.</p>
                    <Button variant="primary" className="fs-5">Learn More</Button>
                  </Col>
                </Row>
              </Container>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="d-block w-100 position-relative">
              <img
                className="d-block"
                src={image2}
                alt="Headphone"
                style={{ height: '500px', width: '90%', margin: '0 auto' }}
              />
              <Container className="carousel-caption-container position-absolute top-50 start-0 translate-middle-y ps-3">
                <Row>
                  <Col md={6}>
                    <h1 className="fs-2">Supercharged </h1>
                    <p className="fs-5">special sale</p>
                    <Button variant="primary" className="fs-5">Learn More</Button>
                  </Col>
                </Row>
              </Container>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="d-block w-100 position-relative">
              <img
                className="d-block"
                src={image3}
                alt="ear buds"
                style={{ height: '500px', width: '90%', margin: '0 auto' }}
              />
              <Container className="carousel-caption-container position-absolute top-50 start-0 translate-middle-y ps-3">
                <Row>
                  <Col md={6}>
                    <h1 className="fs-2">ipad S13+ Pro</h1>
                    <p className="fs-5">From $999.00</p>
                    <Button variant="primary" className="fs-5">Learn More</Button>
                  </Col>
                </Row>
              </Container>
            </div>
          </Carousel.Item>
        </Carousel>
      )}
      <Container className="my-5">
        {loading ? (
          <div className="d-flex justify-content-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : searchResults.length > 0 ? (
          <Row className="justify-content-center mt-5">
            <div className="title d-flex justify-content-center">
              <h1>New <span>Launches</span></h1>
            </div>
            {searchResults.map((product, index) => (
              <ProductDetail
                key={product._id}
                id={product._id}
                title={product.title}
                imageUrl={product.imageUrl}
                price={product.price}
                isNew={index < 20}
              />
            ))}
          </Row>
        ) : (
          <div className="d-flex justify-content-center">
            <h5>No products found</h5>
          </div>
        )}
      </Container>
    </>
  );
}

export default Home;
