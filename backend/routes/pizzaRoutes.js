const express = require('express');
const { addPizza, getPizza, getPizzas, getPizzaById } = require('../controllers/pizzaController');

const router = express.Router();

router.post('/add',addPizza);
router.get('/', getPizzas);
router.get('/:id', getPizzaById);

module.exports = router;