const express = require("express");
const path = require('path');
const rootDir = require('../utils/path.js')

const router = express.Router();

const products = [];

router.get("/add-products", (req, res, next) => {
  // res.sendFile(path.join(rootDir, 'views', 'add-products.html'));

  res.render('add-product', { title: 'Add Products Page', path: '/admin/add-products'})
});

router.post("/add-products", (req, res, next) => {

  products.push({title: req.body.title});


  res.redirect("/");
});

exports.routes = router;
exports.products = products;