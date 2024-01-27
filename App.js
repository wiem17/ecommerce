// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";


import Navigation from './compenents/Navigation';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NewProduct from './pages/NewProduct';
import Product from './pages/Product';
import { useAppApi } from './services/appApi';
import CategoryPage from './pages/CategoryPage';
import ScrollToTop from './compenents/ScrollToTop';
import CartPage from './pages/CartPage';

function App() {
  const  user = useAppApi();
  return (
    <div className="App">
      <Router>
        <ScrollToTop/>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          {user && (<>
            <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          </>
          )}
          {user && (
            <>
             <Route path="/cart" element={<CartPage />} />
            </>
          )}
         <Route path="/product/:id" element={<Product />} />
         <Route path="/category/:description" element={<CategoryPage />} />
          
          <Route path="/product" element={<NewProduct />} />
         

        </Routes>
      </Router>
    </div>
  );
}

export default App;
