const express = require("express");
const productsController = require('../controllers/products.js') 


const router = express.Router();


router.get("/add-products", productsController.getProductPage);

router.post("/add-products", productsController.postProduct);

module.exports = router;