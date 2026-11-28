const Product = require("../models/product.js");

exports.getProductPage = (req, res, next) => {
  // res.sendFile(path.join(rootDir, 'views', 'add-products.html'));

  res.render("admin/edit-product", {
    title: "Add Products Page",
    path: "/admin/add-products",
    editing: false,
    product: {},
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
    if (!product) return res.status(400).end();
    res.render("shop/product-detail", {
      title: product.title,
      path: "/products",
      product,
    });
  });
};

exports.getEditProductPage = (req, res, next) => {
  const id = req.params.id;
  const editMode = Boolean(req.query.edit);

  if (!editMode) {
    res.redirect("/");
    return;
  }

  Product.getById(id, (product) => {
    if(!product) return res.status(404).end();

    res.render("admin/edit-product", {
      title: "Edit ",
      path: "/admin/edit-products",
      editing: editMode,
      product: product
    });
  });
};

exports.updateProduct = (req, res, next) => {
    if(!req.body.id) return res.status(400).end();
    console.log(req.body)
    Product.update(req.body, () => {
        res.status(201).redirect(`/products/${req.body.id}`)
    })
}

exports.deleteProduct = (req, res, next) => {
    if(!req.body.id) return res.status(400).end();

    Product.delete(req.body.id, () => {
        res.redirect('/admin/products')
    })
}