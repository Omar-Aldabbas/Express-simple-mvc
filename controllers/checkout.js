exports.getCheckoutPage = (req, res, next) => {
  res.render("shop/checkout", { title: "Checkpout Page", path: "/checkout" });
};
