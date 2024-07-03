const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());
const authRoutes = require('../routes/authRoutes');
app.use('/api/auth',authRoutes);

module.exports = app;