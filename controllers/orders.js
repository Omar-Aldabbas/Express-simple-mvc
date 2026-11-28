
exports.getOrdersPage = (req, res, next) => {
    res.render("shop/orders", { title: "Orders", path: "/Orders" });
};



