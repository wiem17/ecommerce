import React from 'react';
import {Badge,Card} from 'react-bootstrap';
import LinkContainer from'react-router-bootstrap/LinkContainer';




function SimilarProduct({_id,title,image,description}){
    return(
        <LinkContainer  to={`/product/${_id}`} style={{ cursor: 'pointer', width: '13rem', margin: '10px' }}>
        <Card style={{ width: '20rem', margin: '10px' }}>
          {image && image.length > 0 && (
            <Card.Img variant="top" className='product-preview-img' src={image[0].url}  style={{height:"150px" , objectFit:'cover'}} />
          )}
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>
              <Badge bg="warning" text="dark">{description}</Badge>
            </Card.Text>
          </Card.Body>
        </Card>
      </LinkContainer>
    );
}
export default SimilarProduct;