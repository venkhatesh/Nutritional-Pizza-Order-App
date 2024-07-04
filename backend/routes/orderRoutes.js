const express = require('express');
const { createOrder, getOrders, getUserOrders } = require('../controllers/orderController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create',authenticateToken, createOrder);
router.get('/',authenticateToken, getOrders);
router.get('/my-orders/:userId', authenticateToken, getUserOrders);

module.exports = router;