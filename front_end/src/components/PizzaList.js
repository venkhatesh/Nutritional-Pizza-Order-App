import React, { useEffect, useState } from 'react';
import axiosInstance from '../config/axiosInstance';
import { Link } from 'react-router-dom';

import { API_BASE_URL } from '../config';


const PizzaList = ({ onSelectPizza }) => {
    const [pizzas, setPizzas ] = useState([]);

    useEffect(() => {
        axiosInstance.get(`${API_BASE_URL}/pizzas`)
            .then(respone => setPizzas(respone.data))
            .catch(error => console.error('Error fetching pizzas: ', error));
    }, []);

    return (
        <div>
          <h2>Available Pizzas</h2>
          <div className="pizza-list">
            {pizzas.map(pizza => (
              <div key={pizza.id} className="pizza-item">
                <img src='https://www.superhealthykids.com/wp-content/uploads/2021/10/best-veggie-pizza-featured-image-square-2.jpg' alt={pizza.name} />
                <h3>{pizza.name}</h3>
                <p>Toppings: {pizza.toppings.map(t => t.topping.name).join(', ')}</p>
                <Link to={`/create-pizza/${pizza.id}`}>
                  <button>Start Building</button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      );
    };
    

export default PizzaList;