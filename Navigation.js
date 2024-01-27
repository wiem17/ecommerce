import './Navigation.css';
import React from 'react';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importez les styles Bootstrap
import { LinkContainer } from 'react-router-bootstrap';
import { useAppApi } from '../services/appApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import CartPage from '../pages/CartPage';

const Navigation = () => {
  
  const { user, logout } = useAppApi();
  console.log(user);


  const handleLogout = () => {
    console.log("Logout clicked");
    // Déconnectez l'utilisateur en utilisant la fonction logout du service
    logout();
  };
  return (
    <Navbar bg="light" expand="lg">
      <LinkContainer to="/">
        <Navbar.Brand>E-commerce</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          {/* if no user*/}
          {!user && (
            <LinkContainer to="/login">
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>
          )}
           
           <LinkContainer to="/cart">
  <Nav.Link>
    <FontAwesomeIcon icon={faShoppingCart} />
    {user && user.cart && user.cart.count === 0 && (
      <span className='badge badge-warning' id='cartcount'>
        {user.cart.count}
      </span>
    )}
  </Nav.Link>
</LinkContainer>

          
          {/* if user*/}
          {user && (
            <NavDropdown title={`${user.email}`} id="basic-nav-dropdown">
              {user.isAdmin && (
                <>
                  <LinkContainer to="/dashboard">
                    <NavDropdown.Item>Dashbord</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/NewProduct">
                    <NavDropdown.Item>Create Product</NavDropdown.Item>
                  </LinkContainer>
                </>
              )}
              {!user.isAdmin && (
                <>
                  <LinkContainer to="/cart">
                    <NavDropdown.Item>Cart</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/orders">
                    <NavDropdown.Item>My Orders</NavDropdown.Item>
                  </LinkContainer>
                </>
              )}
              <NavDropdown.Divider />
              <Button variant="danger" onClick={handleLogout} className="logout-btn">
                Logout
              </Button>
            </NavDropdown>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
