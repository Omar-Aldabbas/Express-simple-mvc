const express = require("express");
const path = require("path");
const rootDir = require("../utils/path.js");

const router = express.Router();

const adminData = require("./admin.js");

router.get("/", (req, res, next) => {
  //   console.log("This always runs!");
  next();
});

router.get("/", (req, res, next) => {
  // res.sendFile(path.join(rootDir, 'views', 'shop.html'));

  const products = adminData.products;

  res.render("shop", {
    products: products,
    title: "Shop",
    path: "/",
    hasProducts: products.length > 0,
    activeShop: true,
    productCSS: true,
  });
});

module.exports = router;
