import { Carousel, Container, Button, Card, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { getAllProducts } from './ApiService/ApiService';
import ProductDetail from './Products/ProductDetails';


function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts()
      .then((data) => {
        if (data && data.Products) {
          setProducts(data.Products);
        } else {
          console.error('Error fetching products: Invalid data format');
        }
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);
    
  return <>
    <Carousel className='cars'>
      <Carousel.Item>
        <div className="d-block w-100 position-relative">
          <img
            className="d-block"
            src="/src/assets/images/i watch 800.jpg"
            alt="First slide"
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
            src="/src/assets/images/image-800x400 (1).jpg"
            alt="Second slide"
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
            src="/src/assets/images/image-800x400 (2).jpg"
            alt="Third slide"
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
 
      <Row className="justify-content-center mt-5">
        <div className="title d-flex justify-content-center "><h1>New <span>Launches</span> </h1></div>
       
        {products && products.slice(0,8).map((product,index) => (
          <ProductDetail
            key={product._id}
            id={product._id}
            title={product.title}
            imageUrl={product.imageUrl[0]} 
            price={product.price}
            isNew={index<8}
          />
        ))}
         </Row>
          
  </>
}

export default Home;
