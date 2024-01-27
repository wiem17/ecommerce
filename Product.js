import React, { useEffect, useState } from 'react';
import  {useParams} from 'react-router-dom';
import { useAppApi } from '../services/appApi';
import { Row, Col, Container, Form, Button ,ButtonGroup} from 'react-bootstrap';
import AliceCarousel from 'react-alice-carousel';
import Axios from 'axios';
import Loading from '../compenents/Loading';
import SimilarProduct from '../compenents/SimilarProduct';
import {Badge,Card} from 'react-bootstrap';
import './Product.css';
import LinkContainer from 'react-router-bootstrap/LinkContainer';
import 'react-alice-carousel/lib/alice-carousel.css';
import { addToCart } from '../services/productService';

const Product = () => {
  const { id } = useParams();
  const user = useAppApi();
  const [product, setProduct] = useState(null);
  const [similar, setSimilar] = useState(null);
  const handleDragStart = (e) => e.preventDefault();

  useEffect(() => {
    console.log('Fetching product data for ID:', id);
    Axios.get(`http://localhost:3001/product/${id}`)
      .then(({ data }) => {
        console.log('Received product data:', data);
        setProduct(data.product);
        setSimilar(data.similar);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [id]);
  const handleAddToCart = async () => {
    try {
      // Vérification de la disponibilité des données d'utilisateur et de produit
      if (!user || !user.user || !product) {
        console.error('User or product data is not available');
        return;
      }
  
      await addToCart(user.user._id, product._id, product.price);
      console.log('Product added to cart successfully');
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };
  
  
  





  
  if (!product) {
    return <Loading />;
  }

  const images = product.image.map((image, index) => (
    <img key={index} className='product__carousel--image' src={image.url} onDragStart={handleDragStart} alt={`Product ${index + 1}`} />
  ));
  

  return (
    <Container className='pt-4' style={{ position: 'relative' }}>
      <Row>
        <Col lg={6}>
          <AliceCarousel mouseTracking items={images} controlsStrategy='alternate' />
        </Col>
        <Col lg={6} className='pt-4'>
          <h1>{product.title}</h1>
          <p>
            <Badge bg='primary'>{product.description}</Badge>
          </p>
          <p className='product__price'>${product.price}</p>
          <p style={{ textAlign: 'justify' }} className='py-3'>
            <strong>Description:</strong>
            {product.description}
          </p>
          {user && !user.isAdmin &&(
            <ButtonGroup style={{width:'90%'}}>
              <Form.Select size="lg" style={{width:'40%',borderRadius:"0"}}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>

              </Form.Select>
              
      
        <Button size="lg" onClick={handleAddToCart}>
          Add cart
        </Button>
     
      
            </ButtonGroup>
          )}
          {user && user.isAdmin && (
            <LinkContainer to={'/product/${product._id}/edit'}>
            <Button size="lg">Edit Product</Button>
            
            
            </LinkContainer>
          )}
        </Col>
      </Row>
     
      {/* Affichage des produits similaires */}
      {similar && similar.length > 0 && (
        <Row className='pt-4'>
          <Col>
            <h2>Similar Products</h2>
            <div className='d-flex justify-content-center flex-wrap'>
              {similar.map((similarProduct) => (
                <SimilarProduct key={similarProduct._id} {...similarProduct} />
              ))}
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Product;