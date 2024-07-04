import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import axiosInstance from '../config/axiosInstance'; 
import { API_BASE_URL } from '../config';
import { useNavigate } from 'react-router-dom';

const Cart = ({ userId }) => {
    const { cart, removeFromCart, clearCart } = useContext(CartContext);
    const navigate = useNavigate();

    const handleOrder = () => {
        console.log("INSIDE HANDLE ORDER");
        const pizzaIds = cart.map(pizza => pizza.id);
        console.log("PIZZA ID: ", pizzaIds);
        axiosInstance.post(`${API_BASE_URL}/orders/create`, {
            userId,
            pizzas: pizzaIds
        })
        .then(response => {
            alert('Order created successfully');
            clearCart();
            navigate('/');
        })
        .catch(error => console.error('Error creating order: ', error));
    };

    return (
        <div>
            <h2> Your Cart</h2>
            {cart.length === 0 ? (
                <p> Your Cart is empty</p>
            ) : (
                <ul>
                    {cart.map(pizza => (
                        <li key={pizza.id}>
                            {pizza.name} - Toppings: {pizza.toppings.map(t => t.topping.name).join(', ')}
                            <button onClick={() => removeFromCart(pizza.id)}> Remove </button>
                        </li>
                    ))}
                </ul>
            )}
            {cart.length > 0 && <button onClick={handleOrder}>Place Order</button>}
        </div>
    );
};

export default Cart;