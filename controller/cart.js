const UserModel = require("../models/user");
const ProductModule = require("../models/product");

const addCart = async (req, res) => {
  try {
    const productId = req.body.productId;
    const product = await ProductModule.findById(productId);
    if (!product) {
      return res.status(403).json({
        status: "failed",
        message: "Product not found",
      });
    }
    await UserModel.findByIdAndUpdate(req.user._id, {
      $push: { cart: { productId, quantity: 1 } },
    });
    res.status(200).json({
      sucess: true,
      message: "added into cart",
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

const removeCart = async (req, res) => {
  try {
    const productId = req.body.productId;
    await UserModel.findByIdAndUpdate(req.user._id, {
      $pull: { cart: { productId } },
    });
    res.status(200).json({
      sucess: true,
      message: "remove from wishlist",
      productId: productId,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to remove from cart",
      error: error.message,
    });
  }
};

const getCart = async (req, res) => {
  try {
    const userData = await UserModel.findById(req.user._id);
    // const userdata = await UserModel.findById(req.user._id)
    //   .populate("cart")
    //   .select("cart");
    // const data = userdata.cart.map((item) => item.productId);

    // console.log(data);
    const cartData = userData.cart;
    const productIds = cartData.map((product) => product.productId);
    const productList = await ProductModule.find({
      _id: { $in: productIds },
    });

    const cartItems = cartData.map((cartItem) => {
      const product = productList.find((p) => p._id.equals(cartItem.productId));
      return {
        product,
        quantity: cartItem.quantity,
      };
    });

    res.status(200).json({
      sucess: true,
      message: "added into cart",
      cart: cartItems,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to show the data from cart",
      error: error.message,
    });
  }
};

const updateCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    if (quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be greater than 0",
      });
    }
    const user = await UserModel.findOneAndUpdate(
      { _id: req.user._id, "cart.productId": productId },
      { $set: { "cart.$.quantity": quantity } },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart",
      });
    }

    res.status(200).json({
      success: true,
      message: "Cart updated",
      cart: user.cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to remove from cart",
      error: error.message,
    });
  }
};

const cartController = { addCart, removeCart, getCart, updateCart };
module.exports = cartController;
