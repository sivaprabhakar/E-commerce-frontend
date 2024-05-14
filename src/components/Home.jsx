import React, { useState, useEffect } from 'react';
import { Carousel, Container, Button, Row,Col } from 'react-bootstrap';
import ProductDetail from './Products/ProductDetails';
import Header from './Header/Header';
import { searchProducts, getAllProducts } from './ApiService/ApiService';

function Home() {
  const [searchResults, setSearchResults] = useState([]);
  const [showCarousel, setShowCarousel] = useState(true); // State to control carousel visibility
  const [selectedCategory, setSelectedCategory] = useState(null);
  const handleSearch = async (searchQuery) => {
    try {
      console.log('Searching for:', searchQuery);
      const result = await searchProducts(searchQuery);
      console.log('Search result:', result);
      setSearchResults(result);
      setShowCarousel(false); // Hide carousel when search results are available
    } catch (error) {
      console.error('Error searching products:', error);
    }
  };

  // Fetch all products on component mount
  // useEffect(() => {
  //   getAllProducts()
  //     .then((data) => {
  //       if (data && data.Products) {
  //         setSearchResults(data.Products);
  //       } else {
  //         console.error('Error fetching products: Invalid data format');
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching products:', error);
  //     });
  // }, []);
  useEffect(() => {
    if (selectedCategory) {
      // If a category is selected, search products based on the category
      searchProducts('', selectedCategory)
        .then((result) => {
          setSearchResults(result);
        })
        .catch((error) => {
          console.error('Error searching products:', error);
        });
    } else {
      // If no category is selected, fetch all products
      getAllProducts()
        .then((data) => {
          if (data && data.Products) {
            setSearchResults(data.Products);
          } else {
            console.error('Error fetching products: Invalid data format');
          }
        })
        .catch((error) => {
          console.error('Error fetching products:', error);
        });
    }
  }, [selectedCategory]);

  return (
    <>
      <Header handleSearch={handleSearch}
      onSelectCategory={setSelectedCategory}/>
      {showCarousel && ( // Conditionally render the carousel if showCarousel is true
        <Carousel className='cars'>
           <Carousel.Item>
        <div className="d-block w-100 position-relative">
          <img
            className="d-block"
            src="/src/assets/i watch 800.jpg"
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
            src="/src/assets/image-800x400 (1).jpg"
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
            src="/src/assets/image-800x400 (2).jpg"
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
       
        {searchResults.length > 0 ? (
          <Row className="justify-content-center mt-5">
            <div className="title d-flex justify-content-center ">
            <h1>New <span>Launches</span> </h1>
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
          <div><h5>no products found</h5> </div>
        )}
      </Container>
    </>
  );
}

export default Home;
