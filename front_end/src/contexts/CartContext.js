import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({children}) => {
    const [cart, setCart ] = useState([]);

    const addToCart = (pizza) => {
        setCart([...cart, pizza]);
    }

    const removeFromCart = (pizzaId) => {
        setCart(cart.filter(pizza => pizza.id !== pizzaId));
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};