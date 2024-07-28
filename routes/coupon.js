const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const couponController = require("../controller/coupon");

const router = express.Router();

router.get("/", authMiddleware, couponController.getCoupons);
router.post("/add", authMiddleware, couponController.createCoupon);

module.exports = router;
