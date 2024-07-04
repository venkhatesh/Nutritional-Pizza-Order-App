import React from "react";
import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem('token'); // Check if token exists
    if(!isAuthenticated){
      alert('Please login to access the page ');
    }
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

export default ProtectedRoute;

