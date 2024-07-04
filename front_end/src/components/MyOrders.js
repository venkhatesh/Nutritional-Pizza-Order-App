import React, { useEffect, useState } from "react";
import axiosInstance from "../config/axiosInstance";

const MyOrders = ({userId}) => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log("USER ID LOG ", userId);
        axiosInstance.get(`/orders/my-orders/${userId}`)
        .then(response => {
            setOrders(response.data);
        })
        .catch(error => {
            console.error('Error fetching orders:',error);
        });
    }, []);

    return (
        <div>
            <h2>My Orders</h2>
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ): (
                <ul>
                    {orders.map(order => (
                        <li key={order.id}>
                            <h3> Order #{order.id}</h3>
                            <ul>
                                {order.pizzas.map(op => (
                                    <li key={op.pizza.id}>
                                        {op.pizza.name} - Toppings: {op.pizza.toppings.map(t => t.topping.name).join(', ')}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MyOrders;