const fs = require("fs");

const path = require("path");
const rootDir = require("../utils/path");
const randomid = require("../utils/generateId");

const p = path.join(rootDir, "data", "orders.json");

const orderStatus = ["Pending", "Approved", "Rejected"];
const orderDeliveryStatus = ["onDelivery", "Delivered"];
const paymentMethod = ["CashOnDelivery", "Cash", "Vise", "Cliq"];

function getOrdersFromFile(cb, id = 0) {
  let orders = [];
  fs.readFile(p, (err, data) => {
    if (err) return cb(orders);

    try {
      orders = JSON.parse(data);
    } catch {
      return cb([]);
    }
    if (!Array.isArray(orders)) return cb([]);
    if (id !== 0) {
      return cb(orders.find((o) => o.id === id));
    }
    cb(orders);
  });
}

class Order {
  /**
   *
   */
  constructor({ date, products, paymentMethod }) {
    this.id = randomid();
    this.createdOn = new Date().toISOString();
    this.deliveryDate = date;
    this.paymentMethod = paymentMethod;
    this.orderStatus = orderStatus[0];
    this.orderDeliveryStatus = null;
    this.products = products;
    this.totalAmount = this.getTotal();
  }

  #calculateTotal() {
    return this.products.reduce(
      (total, product) => total + parseFloat(product.price),
      0,
    );
  }

  getTotal() {
    return this.#calculateTotal();
  }

  save() {
    getOrdersFromFile((orders) => {
      orders.push(this);
      fs.writeFile(p, JSON.stringify(orders), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getOrdersFromFile(cb);
  }

  static getOrderbyId(id, cb) {
    getOrdersFromFile(cb, id);
  }

  static deleteOrder(id, cb) {
    getOrdersFromFile((orders) => {
      const newOrders = orders.filter((o) => o.id !== id);
      fs.writeFile(p, JSON.stringify(newOrders), (err) => {
        console.log(err);
        cb();
      });
    });
  }

  static updateOrder(id, newOrder, cb) {
    getOrdersFromFile((orders) => {
      const order = orders.find((o) => o.id === id);
      if (!order) return cb(null);
      if (
        !orderStatus.includes(newOrder.orderStatus) ||
        !paymentMethod.includes(newOrder.paymentMethod)
      ) {
        return cb();
      }
      if (orderDeliveryStatus.includes(newOrder.orderDeliveryStatus) || newOrder.orderDeliveryStatus === null) {
        order.orderDeliveryStatus = newOrder.orderDeliveryStatus;
      } else {
        return cb();
      }
      order.deliveryDate = newOrder.deliveryDate;
    //   order.orderDeliveryStatus = newOrder.orderDeliveryStatus;
      order.orderStatus = newOrder.orderStatus;
      order.products = newOrder.products;
      order.paymentMethod = newOrder.paymentMethod;
      order.totalAmount = newOrder.products.reduce(
        (acc, next) => acc + parseFloat(next.price),
        0,
      );

      fs.writeFile(p, JSON.stringify(orders), (err) => {
        console.log(err);
        cb();
      });
    });
  }
}

module.exports = Order;
