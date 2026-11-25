const products = [];

exports.getProductPage = (req, res, next) => {
  // res.sendFile(path.join(rootDir, 'views', 'add-products.html'));

  res.render("add-product", {
    title: "Add Products Page",
    path: "/admin/add-products",
  });
};

exports.postProduct = (req, res, next) => {
  products.push({ title: req.body.title });

  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  const products = adminData.products;

  res.render("shop", {
    products: products,
    title: "Shop",
    path: "/",
    hasProducts: products.length > 0,
    activeShop: true,
    productCSS: true,
  });
};
