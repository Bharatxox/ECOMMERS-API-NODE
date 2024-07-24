const ProductModule = require("../models/product");

const getReview = async (req, res) => {
  try {
    const productId = req.body.product;
    const product = await ProductModule.findById(productId).select("reviews");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Review list",
      reviews: product.reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get reviews",
      error: error.message,
    });
  }
};

const createReview = async (req, res) => {
  try {
    const productId = req.body.product;
    const review = req.body.review;
    const rating = req.body.rating;
    const userId = req.user._id;

    const product = await ProductModule.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Check if user has already reviewed the product
    const existingReview = product.reviews.find(
      (r) => r.user.toString() === userId.toString()
    );

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "User has already reviewed this product",
      });
    }
    //save the data in database
    product.reviews.push({ review, rating, user: userId });
    await product.save();

    res.status(200).json({
      status: true,
      message: "Review created successfully",
      reviews: product.reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create review",
      error: error.message,
    });
  }
};

const updateReview = async (req, res) => {
  try {
    const productId = req.body.product;
    const rating = req.body.rating;
    const userId = req.user._id;

    const product = await ProductModule.findOneAndUpdate(
      { _id: productId, "reviews.user": userId },
      { $set: { "reviews.$.rating": rating } },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product or review not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Review updated successfully",
      reviews: product.reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update review",
      error: error.message,
    });
  }
};

const deleteReview = async (req, res) => {
  try {
    const productId = req.body.product;
    const userId = req.user._id;

    const product = await ProductModule.findByIdAndUpdate(
      productId,
      {
        $pull: { reviews: { user: userId } },
      },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product or review not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Review deleted successfully",
      reviews: product.reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete review",
      error: error.message,
    });
  }
};

const reviewController = {
  getReview,
  createReview,
  updateReview,
  deleteReview,
};

module.exports = reviewController;
