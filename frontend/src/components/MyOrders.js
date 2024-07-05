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
    }, [userId]);

    return (
        <div className="container mx-auto p-4">
          <h2 className="text-3xl font-bold mb-6 text-center">My Orders</h2>
          {orders.length === 0 ? (
            <p className="text-center text-gray-600">No orders found.</p>
          ) : (
            <div className="space-y-4">
              {orders.map(order => (
                <div key={order.id} className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
                  <h3 className="text-xl font-semibold mb-2">Order #{order.id}</h3>
                  <ul className="list-disc list-inside">
                    {order.pizzas.map(op => (
                      <li key={op.pizza.id} className="text-gray-700">
                        {op.pizza.name} - Toppings: {op.pizza.toppings.map(t => t.topping.name).join(', ')}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    };

export default MyOrders;