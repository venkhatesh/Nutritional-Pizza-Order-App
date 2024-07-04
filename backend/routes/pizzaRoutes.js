const express = require('express');
const { addPizza, getPizza, getPizzas, getPizzaById } = require('../controllers/pizzaController');
const authenticateToken = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/add',authenticateToken,addPizza);
router.get('/', authenticateToken,getPizzas);
router.get('/:id', authenticateToken, getPizzaById);

module.exports = router;