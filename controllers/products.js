const Product = require("../models/product.js");

exports.getProductPage = (req, res, next) => {
  // res.sendFile(path.join(rootDir, 'views', 'add-products.html'));

  res.render("add-product", {
    title: "Add Products Page",
    path: "/admin/add-products",
  });
};

exports.postProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();

  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  const products = Product.fetchAll((products) => {
    res.render("shop", {
      products: products,
      title: "Shop",
      path: "/",
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true,
    });
  });
};
