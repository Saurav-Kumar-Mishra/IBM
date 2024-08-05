require("express-async-errors");
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 8080;

app.use(cors());

const errorHandler = require("./middlewares/errorHandler");
const authMiddleware = require("./middlewares/authentication")

const sellerRoute = require("./routes/seller");
const authRoute = require("./routes/auth");
const storeRoute = require("./routes/store");
const cartRoute = require("./routes/cart");

app.use(express.json());
app.use(authMiddleware);

app.use('/seller', sellerRoute);
app.use("/auth", authRoute);
app.use("/cart", cartRoute)
app.use("/", storeRoute);

app.use(errorHandler);

require("./utils/db");

app.listen(PORT, ()=>{
    console.log(`App is running on port ${PORT}`)
})