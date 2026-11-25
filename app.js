const express = require("express");
const path = require("path");
// const bodyParser = require('body-parser')

const rootDir = require("./utils/path.js");

const adminRoutes = require("./routes/admin.js");
const shopRoutes = require("./routes/shop.js");
const notFoundRoutes = require("./routes/404.js");

const app = express();

app.set("view engine", "ejs"); // plug
app.set("views", "views"); // where to find

// app.use(bodyParser.urlencoded()); // old way
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(rootDir, "public")));

// app.use(adminRoutes, shopRoutes);

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(notFoundRoutes);

// app.use("/{*splat}", (req, res, next) => {
//     res.status(404).send("Page Not Found")
// }) //wild card pattern

app.listen(3000);
