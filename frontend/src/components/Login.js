import React, { useState } from 'react';
import axiosInstance from '../config/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';

const Login = () => {
    const [email, setEmail ] = useState('');
    const [password, setPassword ] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post(`${API_BASE_URL}/auth/login`, {email, password});
            const { token, userId } = response.data;
            localStorage.setItem('token',token);
            localStorage.setItem('userId',userId);
            navigate('/');
            console.log(response.data);
        } catch (error) {
            console.log('Error logging in: ', error);
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <input
                type='email'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type='submit'>Login</button>
        </form>
    );
 
};

export default Login;


