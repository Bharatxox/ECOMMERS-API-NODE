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

app.use("/api/vi/user", userRouter);
app.use("/api/vi/product", productRouter);
app.use("/api/vi/wishlist", wishlistRouter);
app.use("/api/vi/cart", cartRouter);
app.use("/api/vi/order", orderRouter);
app.use("/api/vi/review", reviewRouter);
app.use("/api/vi/coupon", couponRouter);

const port = 10000;

app.listen(port, () => {
  console.log("listening on port at " + port);
});
