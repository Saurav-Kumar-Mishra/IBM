const express = require("express");
const route = express.Router();
const handler = require("../controllers/auth");
const authorizaition = require("../middlewares/authorizaition");

route.post("/login", handler.login);
route.post("/logout", authorizaition, handler.logout)

module.exports = route;