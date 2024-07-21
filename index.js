const express = require("express");
const userRouter = require("./routes/user");
const productRouter = require("./routes/product");
const mongoose = require("mongoose");

const app = express();

//Middleware
app.use(express.json());

//DB connection
mongoose
  .connect(`mongodb://localhost:27017/ecommers`)
  .then(() => console.log("database connection established "))
  .catch((err) => console.error(err));

app.use("/api/vi/user", userRouter);
app.use("/api/vi/product", productRouter);

const port = 10000;

app.listen(port, () => {
  console.log("listening on port at " + port);
});
