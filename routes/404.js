const express= require('express')
const notFoundController = require("../controllers/404.js");


const router = express.Router();


router.use(notFoundController.get404Page);


module.exports = router;