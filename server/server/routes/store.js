const express = require("express");
const route = express.Router();
const handler = require("../controllers/store");

route.get('/categories', handler.getCategories);
route.get('/products', handler.getProducts);
route.get("/product/:id", handler.viewProduct);

module.exports = route;