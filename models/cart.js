const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/path");

const p = path.join(rootDir, "data", "cart.json");

function getCartFromFile(cb) {
  let products;
  fs.readFile(p, (err, data) => {
    if (err) {
      cb([]);
      return;
    }

    try {
      products = JSON.parse(data);
    } catch {
      cb([]);
      return;
    }

    if (!Array.isArray(products)) {
      cb([]);
      return;
    }
    cb(products);
  });
}

class cart {
  constructor() {}

  static fetchAll(cb) {
    getCartFromFile(cb);
  }

  static addToCart(product, cb) {
    getCartFromFile((cp) => {
      cp.push(product);
      fs.writeFile(p, JSON.stringify(cp), (err) => {
        cb(err);
      });
    });
  }

  static removeFromCart(id, cb) {
    getCartFromFile((cp) => {
      fs.writeFile(p, JSON.stringify(cp.filter((p) => p.id !== id)), (err) => {
        cb(err);
      });
    });
  }
}

module.exports = {
  cartClass: cart,
};
