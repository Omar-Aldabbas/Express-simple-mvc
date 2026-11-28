const { Cart } = require("../models/cart.js");
const productClass = require("../models/product.js");

exports.getCartPage = (req, res) => {
  Cart.fetchAll((cart) => {
    res.render("shop/cart", { title: "Cart Page", path: "/cart", cart });
  });
};

exports.getCartProducts = (req, res) => {
  Cart.fetchAll((cart) => {
    res.status(200).send(cart);
  });
};

exports.postCartProduct = (req, res) => {
  if (!req.body.productId) {
    res.status(400).send('Product should have an id');
    return;
  }

  productClass.getById(req.body.productId, (product) => {
    if (!product) return res.status(404).end();
    Cart.addToCart(product, (err) => {
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



  Cart.removeFromCart(req.body.productId, (err) => {
    if (err) return res.status(500).end();

    res.redirect("/cart");
  });
};
