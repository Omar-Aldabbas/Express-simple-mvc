const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/path");

const p = path.join(rootDir, "data", "cart.json");

function getCartFromFile(cb) {
  let cart = { products: [], totalPrice: 0 };
  fs.readFile(p, (err, data) => {
    if (err) {
      cb(cart);
      return;
    }

    try {
      cart = JSON.parse(data);
    } catch {
      cb(cart);
      return;
    }

    if (cart === null || !Array.isArray(cart.products)) {
      cb({ products: [], totalPrice: 0 });
      return;
    }

    cb(cart);
  });
}

class Cart {
  constructor() {}

  static fetchAll(cb) {
    getCartFromFile(cb);
  }

  static addToCart(product, cb) {
    getCartFromFile((cart) => {
      const selected = cart.products.find((p) => p.id === product.id);
      let updatedProduct;
      if (selected) {
        selected.quantity += 1;
      } else {
        updatedProduct = { ...product, quantity: 1 };
        cart.products.push(updatedProduct);
      }

      cart.totalPrice += parseFloat(product.price);
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        cb(err);
      });
    });
  }

  static removeFromCart(id, cb) {
    getCartFromFile((cart) => {
      const updatedCart = { ...cart };
      const deletedProduct = updatedCart.products.find((p) => p.id === id);
        if(!deletedProduct) return cb();

      const productIndex = updatedCart.products.findIndex((p) => p.id === id);
      if (deletedProduct.quantity < 1) return cb();

      if (deletedProduct.quantity == 1) {
        updatedCart.products.splice(productIndex, 1);
      }

      if (deletedProduct.quantity > 1) {
        deletedProduct.quantity -= 1;
      }

      updatedCart.totalPrice =
        updatedCart.totalPrice - deletedProduct.price;


      fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
        cb(err);
      });
    });
  }
}

module.exports = {
  Cart: Cart,
};
