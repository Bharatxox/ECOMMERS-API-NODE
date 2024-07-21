const mongoose = require("mongoose");

const address = {
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

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobileNo: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  address: {
    type: address,
    required: true,
  },
  token: {
    type: String,
    required: false,
    default: "-",
  },
  role: {
    type: String,
    required: true,
    enum: ["CUSTOMER", "SELLER", "ADMIN"],
  },
});

const UserSchema = mongoose.model("user", userSchema);

module.exports = UserSchema;
