const express = require('express');
const { addPizza, getPizza, getPizzas } = require('../controllers/pizzaController');

const router = express.Router();

router.post('/add',addPizza);
router.get('/', getPizzas);

module.exports = router;