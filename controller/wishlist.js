const UserModel = require("../models/user");
const ProductModule = require("../models/product");

const addWishlist = async (req, res) => {
  try {
    const productId = req.body.productId;
    const user = await ProductModule.findById(productId);
    if (!user) {
      return res.status(403).json({
        status: "failed",
        message: "Product not found",
      });
    }
    await UserModel.findByIdAndUpdate(req.user._id, {
      $push: { wishlist: [productId] },
    });
    res.status(200).json({
      sucess: true,
      message: "added into wishlist",
      productId: productId,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to remove from wishlist",
      error: error.message,
    });
  }
};

const removeWishlist = async (req, res) => {
  try {
    const productId = req.body.productId;
    await UserModel.findByIdAndUpdate(req.user._id, {
      $pull: { wishlist: productId },
    });
    res.status(200).json({
      sucess: true,
      message: "remove from wishlist",
      productId: productId,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to remove from wishlist",
      error: error.message,
    });
  }
};

const getWishlist = async (req, res) => {
  try {
    const wishlistData = await UserModel.findById(req.user._id)
      .populate("wishlist")
      .select("wishlist");
    // const wishlistData = userData.wishlist;
    // const productList = await ProductModule.find({
    //   _id: { $in: wishlistData },
    // });
    console.log(wishlistData);
    res.status(200).json({
      sucess: true,
      message: "item in the wish list",
      wishlist: wishlistData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to remove from wishlist",
      error: error.message,
    });
  }
};

const wishlistController = { addWishlist, removeWishlist, getWishlist };
module.exports = wishlistController;
