import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Loading from '../compenents/Loading';
import './CategoryPage.css';
import { Card, Badge } from 'react-bootstrap';

function CategoryPage() {
    const { description } = useParams();
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        setLoading(true);
        Axios.get(`http://localhost:3001/product/category/${description}`)
            .then(({ data }) => {
                setLoading(false);
                setProducts(data);
            })
            .catch((e) => {
                setLoading(false);
                console.log(e.message);
            });
    }, [description]);

    if (loading) {
        return <Loading />;
    }

    const productSearch = products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='description-page-container'>
            <div className={`pt-3 ${description}-banner-container category-banner-container`}>
                <h1 className='text-center'>{description.charAt(0).toUpperCase() + description.slice(1)}</h1>
            </div>
            <div className='d-flex justify-content-center align-items-center flex-wrap'>
    <input type="search" placeholder='Search' onChange={(e) => setSearchTerm(e.target.value)} />
</div>

            {productSearch.length === 0 ? (
                <div>
                    <h1>No product to show</h1>
                </div>
            ) : (
                <Container>
                    <Row>
                        {productSearch.map((product) => (
                            <Col md={{ span: 4 }} key={product._id} style={{ width: '20rem', margin: '10px' }}className='d-flex justify-content-center flex-wrap' >
                                
                                <Card style={{ width: '20rem', margin: '10px' }}>
      
                                <Card.Img variant="top" className='product-preview-img' src={product.image[0].url} alt={product.title}  style={{height:"150px" , objectFit:'cover'}} />
    
                                  <Card.Body>
                                    <Card.Title>{product.title}</Card.Title>
                                        <Card.Text>
                                      <Badge bg="warning" text="dark">{product.description}</Badge>
                                     </Card.Text>
                                   </Card.Body>
                                    </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            )}
        </div>
    );
}

export default CategoryPage;
