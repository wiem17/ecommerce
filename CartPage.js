import React from 'react';
import { useAppApi } from '../services/appApi';
import ProductsList from './NewProduct';
import { Container, Row, Alert } from 'react-bootstrap';

function CartPage() {
    const user = useAppApi();
    const useCartObj = user?.Cart; // Utilisation de l'opérateur de questionnement optionnel

    // Vérifie si useCartObj est défini avant d'accéder à ses propriétés
    const cartProductIds = useCartObj ? Object.keys(useCartObj) : [];

    return (
        <Container style={{ minHeight: '05vh' }} className="cart-container">
            <Row>
                <h1 className='pt-2 h3'>Shopping cart</h1>
                {cartProductIds.length === 0 ? (
                    <Alert variant="info">
                        Shopping cart is empty. Add products to your cart.
                    </Alert>
                ) : (
                    <ProductsList cartProductIds={cartProductIds} />
                )}
            </Row>
        </Container>
    );
}

export default CartPage;
