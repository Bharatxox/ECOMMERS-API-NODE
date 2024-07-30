const express = require("express");
const userRouter = require("./routes/user");
const productRouter = require("./routes/product");
const wishlistRouter = require("./routes/wishlist");
const cartRouter = require("./routes/cart");
const orderRouter = require("./routes/order");
const reviewRouter = require("./routes/review");
const couponRouter = require("./routes/coupon");
const mongoose = require("mongoose");

const app = express();

require("dotenv").config();

//Middleware
app.use(express.json());

//DB connection
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("database connection established "))
  .catch((err) => console.error(err));

app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/wishlist", wishlistRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/review", reviewRouter);
app.use("/api/v1/coupon", couponRouter);

const port = 10000;

app.listen(port, () => {
  console.log("listening on port at " + port);
});
