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
        <div className='container mx-auto'>
          <h2 className='text-3xl font-bold text-center my-8'>Available Pizzas</h2>
          <div className="grid grid-cols-1 sm:grid-cols2 md:grid-cols-3 gap-8">
            {pizzas.map(pizza => (
              <div key={pizza.id} className="bg-white shadow-md rounded-lg p-4">
                <img src='https://www.superhealthykids.com/wp-content/uploads/2021/10/best-veggie-pizza-featured-image-square-2.jpg' alt={pizza.name} />
                <h2 className='text-xl font-semibold mt-4'>{pizza.name}</h2>
                <p className='text-gray-600'>Toppings: {pizza.toppings.map(t => t.topping.name).join(', ')}</p>
                <Link to={`/create-pizza/${pizza.id}`}>
                  <button className='mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg'>Start Building</button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      );
    };
    

export default PizzaList;