import React, { useEffect, useState } from 'react';
import { Row, Col, Container, Form, Button } from 'react-bootstrap';
import { createProduct } from '../services/productService';
import './NewProduct.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';


const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    title: '',
    description: '',
    price: 0,
    image: [], // Assuming images is an array to hold multiple image URLs
  });
 const navigate=useNavigate();
 
 
  const [imgToRemove, setImgToRemove] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);



  const handleRemoveImg = (imgObject) => {
    if (imgObject && imgObject.public_id) {
      const publicId = imgObject.public_id;
  
      // Envoyez la requête DELETE vers le serveur avec l'URL correcte et le bon ID de l'image
      Axios.delete(`http://localhost:3001/images/${publicId}`)
        .then(response => {
          console.log('Delete request successful:', response.data);
  
          // Mettez à jour l'état des images dans votre composant
          setNewProduct((prevProduct) => ({
            ...prevProduct,
            image: prevProduct.image.filter((image) => image.public_id !== publicId),
          }));
  
          // Vous pouvez également réinitialiser l'état imgToRemove ici si nécessaire
          // setImgToRemove(null);
        })
        .catch(error => {
          console.error('Error in delete request:', error);
          // Gérer les erreurs si nécessaire
        });
    }
  };
  
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };




  const handleCreateProduct = async (e) => {
    e.preventDefault();
  
    // Vérifiez si tous les champs sont remplis
    if (!newProduct.title || !newProduct.description || !newProduct.price || newProduct.image.length === 0) {
      return alert("Please fill out all the fields");
    }
  
    try {
      // Appeler la fonction pour créer un produit
      const response = await createProduct(newProduct);
  
      // Vérifiez si la création du produit a réussi (vous pouvez ajuster cette vérification selon la structure de votre réponse)
      if (response.data && response.data.length === 0) {
        // Réinitialiser le formulaire après la création du produit
        setNewProduct({
          title: '',
          description: '',
          price: 0,
          image: [], // Reset the images array
        });
       
        // Utiliser `navigate` pour rediriger vers la page d'accueil après un délai de 1,5 secondes
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
          navigate('/');
        }, 1500);
      }
    } catch (error) {
      console.error('Error creating product:', error);
      // Gérer les erreurs si nécessaire
    }
  };
  const showWidget = () => {
    // Use Cloudinary Upload Widget to handle image uploads
    const widget = window.cloudinary.createUploadWidget({
      cloudName: 'dqwc3ewbs', // Replace with your Cloudinary cloud name
      uploadPreset: 'qfnwdnb8', // Replace with your Cloudinary upload preset
    }, (error, result) => {
      if (!error && result && result.event === 'success') {
        // Handle a successful image upload
        const imageUrl = result.info.secure_url;
        setNewProduct((prevProduct) => ({
          ...prevProduct,
          image: [...prevProduct.image, result.info],
        }));
      }
    });

    // Open the Cloudinary Upload Widget
    widget.open();
  };

  useEffect(() => {
    console.log('newProduct:', newProduct);
    console.log('imgToRemove:', imgToRemove);
  }, [newProduct, imgToRemove]);

  return (
    <Container>
      <Row>
        <Col md={6} className='newproduct__form--container'>
          <form style={{ width: "100%" }} onSubmit={handleCreateProduct} className='upload-form'>
            <h1>Create a product</h1>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Enter title" name="title" value={newProduct.title} required onChange={handleInputChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" placeholder="Enter description" name="description" value={newProduct.description} required onChange={handleInputChange} />
            </Form.Group>
            <Form.Group>
              <Button type='button' onClick={showWidget} className='upload-button'>Upload Images</Button>
              <div className='images-preview'>
                {newProduct.image.map((image, index) => (
                  <div key={index} className='image-preview'>
                    <img src={image.secure_url} alt={`Preview ${index}`} />
                    <i onClick={() => handleRemoveImg(image)}>
                       {imgToRemove !== image.public_id && (
                          <FontAwesomeIcon icon={faTimes} className="delete-icon" />
                         )}
                         </i>
                  </div>
                ))}
              </div>
            </Form.Group>
            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" placeholder="Enter price" name="price" value={newProduct.price} required onChange={handleInputChange} />
            </Form.Group>
            <Form.Group>
              <Button type="submit">Create Product</Button>
            </Form.Group>
            {showSuccessMessage && (
              <div className="success-message">
                Product added successfully!
              </div>
            )}
          </form>
        </Col>
        <Col md={6} className='newproduct__image--container'></Col>
      </Row>
    </Container>
  );
};

export default ProductsList;
