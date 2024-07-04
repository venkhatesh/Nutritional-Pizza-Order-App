const express = require('express');
const { addTopping, getToppings } = require('../controllers/toppingController');
const authenticateToken = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/add',authenticateToken, addTopping);
router.get('/',authenticateToken, getToppings);

module.exports = router;