const express = require("express");
const orderController = require("../controller/order");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, orderController.placeOrder);

module.exports = router;
