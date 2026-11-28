const { cartClass } = require("../models/cart.js");
const productClass = require("../models/product.js");

exports.getCartPage = (req, res) => {
  let cp;
  cartClass.fetchAll((products) => {
    cp = products;
    res.render("shop/cart", { title: "Cart Page", path: "/cart", cp });
  });
};

exports.getCartProducts = (req, res) => {
  cartClass.fetchAll((products) => {
    let cp = products;

    res.status(200).send(cp);
  });
};

exports.postCartProduct = (req, res) => {
  if (!req.body.productId) {
    res.status(400).send('Product should have an id');
    return;
  }

  productClass.getById(req.body.productId, (product) => {
    if (!product) return res.status(404).end();
    cartClass.addToCart(product, (err) => {
      if (err) return res.status(500).end();

      res.redirect("/cart");
    });
  });
};

exports.deleteCartProduct = (req, res) => {
  if (!req.body.productId) {
    res.status(400).end();
    return;
  }



  cartClass.removeFromCart(req.body.productId, (err) => {
    if (err) return res.status(500).end();

    res.redirect("/cart");
  });
};
