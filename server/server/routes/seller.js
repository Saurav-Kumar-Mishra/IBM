const express = require("express");
const route = express.Router();
const handler = require("../controllers/seller");
const {uploadImages} = require("../middlewares/multer");
const authorization = require("../middlewares/authorizaition");
const {imgFileHandle} =require("../middlewares/mediaHandler") 


route.use(authorization);
route.get("/", handler.getProducts);
route.post("/addProduct", imgFileHandle,  handler.addProduct);


module.exports = route;