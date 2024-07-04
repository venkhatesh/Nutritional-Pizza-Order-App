import React, { useState } from 'react';
import axiosInstance from '../config/axiosInstance';
import { API_BASE_URL } from '../config';


const Order = ({ pizzas, userId }) => {
    const [selectedPizzas, setSelectedPizzas] = useState([]);
    const [selectedPizzasId, setSelectedPizzasId] = useState([]);
    
    const handlePizzaChange = (pizza) => {
        console.log("Random",pizzas);
        // setSelectedPizzas(...selectedPizzas, pizza);
        setSelectedPizzasId(prevSelected => {
            const newSelected = prevSelected.includes(pizza.id) ?
                prevSelected.filter(id => id !== pizza.id) :
                [...prevSelected, pizza.id];
                console.log('Selected Pizzas:', newSelected);
                return newSelected;
        });
    };

    const handleSubmit = () => {
        console.log("PIZZA SUBMISSION ", localStorage.get('userId'));
        axiosInstance.post(`${API_BASE_URL}/orders/create`, {
            userId: localStorage.get('userId'),
            pizzas: selectedPizzasId
        })
        .then(response => {
            alert("Order Created Successfully");
            console.log(response.data.order);
        })
        .catch(error => console.error("Error creating order:", error));
    };
    return (
        <div>
            <h2> Create Order </h2>
            <div>
                <h3> Select Pizza </h3>
                {pizzas.map(pizza => (
                    <label key={pizza.id}>
                        <input
                            type="checkbox"
                            value={pizza.id}
                            onChange={() => handlePizzaChange(pizza)}
                        />
                        {pizza.name} 
                        {/* - Toppings: {pizza.toppings.map(t => t.topping.name.join(', '))} */}
                    </label>
                ))}
            </div>
            <button onClick={handleSubmit}> Place Order </button>
        </div>
    );
};

export default Order;