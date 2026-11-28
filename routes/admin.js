const express = require("express");
const productsController = require("../controllers/products.js");

const router = express.Router();

router.get("/add-products", productsController.getProductPage);

router.post("/add-products", productsController.postProduct);

router.get("/products", productsController.getAdminProducts);

router.get("/edit-products/:id", productsController.getEditProductPage);

router.post("/edit-products", productsController.updateProduct);


module.exports = router;
