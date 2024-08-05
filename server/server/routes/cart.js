const express = require("express");
const route = express.Router();
const handler = require("../controllers/cart");
const authorizaition = require("../middlewares/authorizaition");

route.use(authorizaition);
route.get("/", handler.getCart);
route.post("/", handler.addToCart);
route.put("/", handler.updateCartItem);

module.exports = route;