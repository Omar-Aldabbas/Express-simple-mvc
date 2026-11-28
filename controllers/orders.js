const Order = require('../models/orders');


exports.getOrdersPage = (req, res, next) => {
    Order.fetchAll((orders) => {
        res.render("shop/orders", { title: "Orders", path: "/Orders" , orders});
    })
};

