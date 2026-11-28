const Product = require("../models/product.js");

exports.getProductPage = (req, res, next) => {
  // res.sendFile(path.join(rootDir, 'views', 'add-products.html'));

  res.render("admin/add-product", {
    title: "Add Products Page",
    path: "/admin/add-products",
  });
};

exports.postProduct = (req, res, next) => {
  const product = new Product({
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
  });
  product.save();

  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  const products = Product.fetchAll((products) => {
    res.render("shop/product-list", {
      products,
      title: "All Products",
      path: "/products",
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true,
    });
  });
};

exports.getProductById = (req, res) => {
  let product;

  Product.fetchAll(
    (products) =>
      (product = products.filter((p) => {
        p.id === req.body.product.id;
      })),
  );
};

exports.getIndex = (req, res) => {
  const products = Product.fetchAll((products) => {
    res.render("shop/index", {
      products,
      title: "Shop",
      path: "/",
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true,
    });
  });
};

exports.getAdminProducts = (req, res, next) => {
  const products = Product.fetchAll((products) => {
    res.render("admin/product-list", {
      products,
      title: "Admin Products",
      path: "/admin/products",
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true,
    });
  });
};

exports.getProductDetailsPage = (req, res, next) => {
  const id = req.params.id;

  if (!id) return res.status(400).end();

  Product.getById(id, (product) => {
    if(!product) return res.status(400).end();
    res.render("shop/product-detail", { title: product.title, path:'/products', product });
  });
};
