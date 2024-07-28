const mongoose = require("mongoose");

const replySchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, required: true },
  reply: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const reviews = {
  review: {
    type: String,
  },
  rating: {
    type: Number,
  },
  user: { type: mongoose.Types.ObjectId },
  replies: [replySchema], // Add replies to the review schema
  _id: false,
};

const productSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  discountPercentage: {
    type: Number,
  },
  rating: {
    type: Number,
  },
  stock: {
    type: Number,
  },
  brand: {
    type: String,
  },
  category: {
    type: String,
  },
  thumbnail: {
    type: String,
  },
  images: {
    type: [String],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  reviews: {
    type: [reviews],
    required: false,
  },
});

const ProductModule = mongoose.model("products", productSchema);

module.exports = ProductModule;
