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
          addToCart(customizedPizza);
          navigate('/cart');
      };

      if (!pizza) return <div>Loading...</div>;

      return (
        <div>
          <h2>Customize {pizza.name}</h2>
          <div className="toppings-list">
            {toppings.map(topping => (
              <label key={topping.id}>
                <input
                  type="checkbox"
                  value={topping.id}
                  onChange={() => handleToppingChange(topping.id)}
                />
                {topping.name}
              </label>
            ))}
          </div>
          <button onClick={handleSubmit}>Add to Cart</button>
        </div>
      );
    };


export default CustomPizza;