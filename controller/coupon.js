const CouponModel = require("../models/coupon");

// Create a new coupon
const createCoupon = async (req, res) => {
  try {
    const { code, discount, expiryDate } = req.body;
    const newCoupon = await CouponModel.create({
      code,
      discount,
      expiryDate,
    });
    res.status(201).json({ success: true, data: newCoupon });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get all coupons
const getCoupons = async (req, res) => {
  try {
    const coupons = await CouponModel.find();
    res.status(200).json({ success: true, data: coupons });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const couponController = { createCoupon, getCoupons };

module.exports = couponController;
