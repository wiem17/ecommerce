// productService.js
import Axios from 'axios';

 // Remplacez-le par l'URL de votre API

export const getAllProducts = async () => {
  try {
    const response = await Axios.get("http://localhost:3001/product/getallproduits");
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getProductById = async (productId) => {
  try {
    const response = await Axios.get("http://localhost:3001/product/getproduitbyid/:id");
    return response.data;
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    throw error;
  }
};

export const createProduct = async (productData) => {
  try {
    const response = await Axios.post("http://localhost:3001/product/addproduit", productData);
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const updateProduct = async (productId, productData) => {
  try {
    const response = await Axios.put("http://localhost:3001/product/updateproduit/:id", productData);
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

export const deleteProduct = async (productId) => {
  try {
    const response = await Axios.delete("http://localhost:3001/product/deletepro/:id");
    return response.data;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};


export const addToCart = async (userId, productId, price) => {
  try {
    const response = await Axios.post(`http://localhost:3001/product/add-to-cart`, { userId, productId, price });
    return response.data;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};

export const increaseCart = async (userId, productId, price) => {
  try {
    const response = await Axios.post(`http://localhost:3001/product/increase-cart`, { userId, productId, price });
    return response.data;
  } catch (error) {
    console.error('Error increasing cart:', error);
    throw error;
  }
};

export const decreaseCart = async (userId, productId, price) => {
  try {
    const response = await Axios.post(`http://localhost:3001/product/decrease-cart`, { userId, productId, price });
    return response.data;
  } catch (error) {
    console.error('Error decreasing cart:', error);
    throw error;
  }
};

export const removeFromCart = async (userId, productId, price) => {
  try {
    const response = await Axios.post(`http://localhost:3001/product/remove-from-cart`, { userId, productId, price });
    return response.data;
  } catch (error) {
    console.error('Error removing from cart:', error);
    throw error;
  }
};
