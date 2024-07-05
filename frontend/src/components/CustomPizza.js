import React, { useContext, useEffect, useState } from "react";
import axiosInstance from "../config/axiosInstance";
import { API_BASE_URL } from '../config';
import { useNavigate, useParams } from "react-router-dom";
import { CartContext } from '../contexts/CartContext';


const CustomPizza = ({ onCreatePizza }) => {
    const { pizzaId } = useParams();
    const navigate = useNavigate();
    const [pizza, setPizza] = useState(null);
    const [toppings, setToppings] = useState([]);
    const [selectedToppings, setSelectedToppings] = useState([]);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {

        axiosInstance.get(`${API_BASE_URL}/pizzas/${pizzaId}`)
            .then(response => setPizza(response.data))
            .catch(error => console.error('Error fetching pizza:',error));

        axiosInstance.get(`${API_BASE_URL}/toppings`)
            .then(response => setToppings(response.data))
            .catch(error => console.error('Error fetching toppings:',error));
    }, []);

    const handleToppingChange = (toppingId) => {
        setSelectedToppings(prevSelected => {
            if( prevSelected.includes(toppingId)) {
                return prevSelected.filter(id => id !== toppingId);
            } else {
                return [...prevSelected, toppingId];
            }
        });
    };

    const handleSubmit = () => {
        const customizedPizza = {
            ...pizza,
            toppings: pizza.toppings.concat(selectedToppings.map(id => ({
              topping: toppings.find(t => t.id === id)
            })))
          };
          console.log("CUSTOMIZED PIZZA BHAI ", customizedPizza);
          addToCart(customizedPizza);
          navigate('/cart');
      };

      if (!pizza) return <div>Loading...</div>;

      return (
        <div className="container mx-auto p-4">
          <h2 className="text-3xl font-bold mb-4 text-center">Customize {pizza.name}</h2>
          <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
            <img src='https://www.superhealthykids.com/wp-content/uploads/2021/10/best-veggie-pizza-featured-image-square-2.jpg' alt={pizza.name} className="w-full h-64 object-cover mb-4 rounded-lg" />
            <h3 className="text-2xl font-semibold mb-4">Toppings</h3>
            <div className="grid grid-cols-2 gap-4">
              {toppings.map(topping => (
                <label key={topping.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedToppings.includes(topping.id)}
                    onChange={() => handleToppingChange(topping.id)}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                  <span className="text-gray-700">{topping.name}</span>
                </label>
              ))}
            </div>
            <button
              onClick={handleSubmit}
              className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Add to Cart
            </button>
          </div>
        </div>
      );
    };


export default CustomPizza;