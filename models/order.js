const mongoose = require("mongoose");

const addressSchema = {
  addressLane1: {
    type: String,
    required: true,
  },
  addressLane2: {
    type: String,
    required: false,
    default: "-",
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  landmark: {
    type: String,
    required: false,
    default: "-",
  },
  _id: false,
};

const itemSchema = {
  product: {
    type: mongoose.Types.ObjectId,
  },
  quantity: {
    type: Number,
  },
};

const orderSchema = new mongoose.Schema({
  items: {
    type: [itemSchema],
  },
  totalAmount: {
    type: Number,
  },
  deliveryAddress: {
    type: addressSchema,
  },
  billingAddress: {
    type: addressSchema,
  },
  modeOfpayment: {
    type: String,
    enum: ["COD", "ONLINE"],
  },
  orderStatus: {
    type: String,
    enum: [
      "PENDING",
      "IN_PROCESS",
      "SHIPPED",
      "OUT_FOR_DELIVERY",
      "DELIVERED",
      "RETURNED",
      "CANCELLED",
    ],
    default: "PENDING",
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
});

const OrderModel = mongoose.model("order", orderSchema);

module.exports = OrderModel;
