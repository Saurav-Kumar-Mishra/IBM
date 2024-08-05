const express = require("express");
const route = express.Router();
const handler = require("../controllers/seller");
const {uploadImages} = require("../middlewares/multer");
const authorization = require("../middlewares/authorizaition");


route.use(authorization);
route.get("/", handler.getProducts);
route.post("/addProduct", uploadImages,  handler.addProduct);


module.exports = route;