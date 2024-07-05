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
        <div className="container mx-auto p-6">
          <h2 className="text-3xl font-bold mb-6">Your Cart</h2>
          {cart.length === 0 ? (
            <p className="text-lg">Your cart is empty.</p>
          ) : (
            <div>
              {cart.map((item, index) => (
                <div key={index} className="flex items-center justify-between bg-white p-4 mb-4 shadow-md rounded-lg">
                  <div>
                    <h3 className="text-xl font-semibold">{item.name}</h3>
                    <p className="text-gray-700">Toppings: {item.toppings.map(t => t.topping.name).join(', ')}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(index)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                onClick={handleOrder}
                className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition duration-300 mt-6"
              >
                Place Order
              </button>
            </div>
          )}
        </div>
      );
    };

export default Cart;