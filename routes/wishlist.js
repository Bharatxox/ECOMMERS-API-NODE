const express = require("express");
const wishlistController = require("../controller/wishlist");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, wishlistController.getWishlist);
router.post("/add", authMiddleware, wishlistController.addWishlist);
router.post("/remove", authMiddleware, wishlistController.removeWishlist);

module.exports = router;
