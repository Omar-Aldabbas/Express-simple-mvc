const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/path.js");
const generateId = require("../utils/generateId.js");

const p = path.join(rootDir, "data", "products.json");

const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, data) => {
    if (err) {
      return cb([]);
    }
    if (!Array.isArray(JSON.parse(data))) {
      return cb([]);
    }
    return cb(JSON.parse(data));
  });
};

class Product {
  constructor({ title, price, description, imageUrl = "" }) {
    this.id = generateId();
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this.createdOn = new Date().toISOString();
  }

  save() {
    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static getById(id, cb) {
    getProductsFromFile((products) => {
      const product = products.find((p) => p.id === id);

      cb(product);
    });
  }

  static update(product, cb) {
    getProductsFromFile((products) => {
      const existingProduct = products.find((p) => p.id === product.id);
      if (!existingProduct || existingProduct.id !== product.id ) {
        cb();
        return;
    }

      Object.assign(existingProduct, product);

      fs.writeFile(p, JSON.stringify(products), (err) => {
        cb(err);
      });
    });
  }

  static delete(id, cb) {
    getProductsFromFile((products) => {
      const existingProductIndex = products.findIndex(
        p=> p.id === id);
      if (existingProductIndex < 0) return cb();
      products.splice(existingProductIndex, 1);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        cb(err);
      });
    });
  }
}

module.exports = Product;
