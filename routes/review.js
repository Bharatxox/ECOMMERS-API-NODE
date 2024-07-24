const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

const reviewController = require("../controller/review");

router.get("/", reviewController.getReview);
router.post("/create", authMiddleware, reviewController.createReview);
router.post("/update", authMiddleware, reviewController.updateReview);
router.post("/remove", authMiddleware, reviewController.deleteReview);

module.exports = router;
