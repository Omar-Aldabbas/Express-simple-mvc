const express = require('express');
const checkoutController = require('../controllers/checkout');

const router = express.Router();


router.get('/', checkoutController.getCheckoutPage);


module.exports = router;