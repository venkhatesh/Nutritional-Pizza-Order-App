const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const authRoutes = require('../routes/authRoutes');
const pizzaRoutes = require('../routes/pizzaRoutes');
const toppingRoutes = require('../routes/toppingRoutes');
const orderRoutes = require('../routes/orderRoutes');


app.use('/api/auth',authRoutes);
app.use('/api/pizzas', pizzaRoutes);
app.use('/api/toppings', toppingRoutes);
app.use('/api/orders', orderRoutes);

module.exports = app;