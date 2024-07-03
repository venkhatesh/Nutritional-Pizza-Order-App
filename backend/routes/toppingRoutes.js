const express = require('express');
const { addTopping, getToppings } = require('../controllers/toppingController');

const router = express.Router();

router.post('/add',addTopping);
router.get('/',getToppings);

module.exports = router;