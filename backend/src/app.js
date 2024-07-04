const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const logger = require('../middleware/logger');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

if(process.env.NODE_ENV === 'production'){
    app.use((req, res, next) => {
        if(req.headers['x-forwarded-proto'] !== 'https'){
            return res.redirect(`https://${req.headers.host}${req.url}`);
        }
        next();
    });
}

const globalRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again later'
});

app.use(globalRateLimiter);

morgan.token('user', (req) => req.userId || 'guest');
morgan.token('date', () => new Date().toISOString());
app.use(morgan(':date :method :url :status :response-time ms - :res[content-length] - User: :user', {
    stream: {
        write: (message) => logger.info(message.trim())
    }
}));

const authRoutes = require('../routes/authRoutes');
const pizzaRoutes = require('../routes/pizzaRoutes');
const toppingRoutes = require('../routes/toppingRoutes');
const orderRoutes = require('../routes/orderRoutes');


app.use('/api/auth',authRoutes);
app.use('/api/pizzas', pizzaRoutes);
app.use('/api/toppings', toppingRoutes);
app.use('/api/orders', orderRoutes);

module.exports = app;