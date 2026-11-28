const express = require("express");
const productsController = require("../controllers/products.js");
//for now
const ordersController = require('../controllers/orders.js')

const router = express.Router();

router.get("/", productsController.getIndex);

router.get("/products", productsController.getProducts);
router.get("/products/:id", productsController.getProductDetailsPage);

router.get('/orders', ordersController.getOrdersPage)


module.exports = router;
