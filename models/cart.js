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
      const newproducts = cart.products.filter((p) => p.id !== id);
      const total = newproducts.reduce(
        (acc, next) => acc + next.quantity * parseFloat(next.price),
        0,
      );

      const newCart = { products: newproducts, totalPrice: total };

      fs.writeFile(p, JSON.stringify(newCart), (err) => {
        cb(err);
      });
    });
  }
}

module.exports = {
  Cart: Cart,
};
