const express = require("express");
const path = require('path')
// const bodyParser = require('body-parser')

const adminRoutes = require("./routes/admin.js");
const shopRoutes = require("./routes/shop.js");

const app = express();

// app.use(bodyParser.urlencoded()); // old way
app.use(express.urlencoded({ extended: false}))


// app.use(adminRoutes, shopRoutes);

app.use("/admin",adminRoutes);
app.use(shopRoutes)

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
})

// app.use("/{*splat}", (req, res, next) => {
//     res.status(404).send("Page Not Found")
// }) //wild card pattern


app.listen(3000);
