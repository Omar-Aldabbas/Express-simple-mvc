const express = require("express");
const router = express.Router();

const cartClass = require("../controllers/cart");

router.get("/", cartClass.getCartPage);

router.post("/", cartClass.postCartProduct);

router.post("/delete", cartClass.deleteCartProduct);


module.exports = router;