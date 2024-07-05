import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PizzaList from './components/PizzaList';
import CustomPizza from './components/CustomPizza';
import Order from './components/Order';
import Cart from './components/Cart';
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';
import ProtectedRoute from './ProtectedRoute';
import { CartProvider } from './contexts/CartContext';
import axios from 'axios';
// import './App.css';
import MyOrders from './components/MyOrders';


const App = () => {
  const [pizzas, setPizzas] = useState([]);
  const [userId, setUserId] = useState(); // Replace with actual user ID logic

  const handleSelectPizza = (pizza) => {
    console.log('Selected Pizzas ', pizza);
    console.log(pizzas);
    setPizzas([...pizzas, pizza]);
  };

  const handleCreatePizza = (pizzaData) => {
    axios.post('/api/pizzas/add', pizzaData)
      .then(response => {
        setPizzas([...pizzas, response.data.pizza]);
        alert('Pizza created successfully!');
      })
      .catch(error => console.error('Error creating pizza:', error));
  };

  const handleLogin = () => {
    setUserId(localStorage.getItem('userId'));
  }

  const handleLogout = () => {
    setUserId(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }

  return (
    <CartProvider>
      <Router>
        <div>
          <nav className='bg-gray-800 p-6'>
            <ul className='flex space-x-8 justify-center text-lg font-semibold'>
              <li><Link to="/" className='text-white'>Home</Link></li>
              <li><Link to="/cart" className='text-white'>Cart</Link></li>
              {/* <li><Link to="/order">Order</Link></li> */}
              <li><Link to="/my-orders" className='text-white'>My Orders</Link></li> 
              <li><Link to="/register" className='text-white'>Register</Link></li>
              {localStorage.getItem('userId') ? (
                <li><Link to="/logout" className='text-white' onClick={handleLogout}>Logout</Link></li>
              ) : (
                <li><Link to="/login" className='text-white'>Login</Link></li>
              )}            
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<PizzaList />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register />}/>
            <Route path="/logout" element={<Logout />} />
            <Route
              path="/create-pizza/:pizzaId"
              element={
                <ProtectedRoute>
                  <CustomPizza />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart userId={localStorage.getItem('userId')} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/order"
              element={
                <ProtectedRoute>
                  <Order userId={localStorage.getItem('userId')} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-orders"
              element={
                <ProtectedRoute>
                  <MyOrders userId={localStorage.getItem('userId')}/>
                </ProtectedRoute>
              }
            /> 
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
};

// return (
//     <Router>
//       <div>
//         <nav>
//           <ul>
//             <li><Link to="/">Home</Link></li>
//             {/* <li><Link to="/cart">Cart</Link></li> */}
//           </ul>
//         </nav>
//         <Routes>
//           <Route exact path="/" element={<PizzaList />} />
//           <Route path="/create-pizza/:pizzaId" element={<CustomPizza />} />
//           {/* <Route path="/cart" element={<Cart userId={userId} />} /> */}
//         </Routes>
//       </div>
//     </Router>
// );
// };


export default App;
