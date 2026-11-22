const express = require('express');

const router = express.Router();

router.get("/", (req, res, next) => {
//   console.log("This always runs!");
  next();
});


router.get("/", (req, res, next) => {
  res.send("<h1>Base handler </h1>");
});



module.exports = router;
