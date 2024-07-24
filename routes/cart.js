const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const cartController = require("../controller/cart");

const router = express.Router();

router.get("/", authMiddleware, cartController.getCart);
router.post("/add", authMiddleware, cartController.addCart);
router.post("/remove", authMiddleware, cartController.removeCart);
router.post("/update", authMiddleware, cartController.updateCart);

module.exports = router;
