const express = require("express");
const userController = require("../controller/user");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/signup", userController.signup);

router.post("/login", userController.login);

router.post("/logout", authMiddleware, userController.logout); // Add the logout route

router.post("/forgot-password", userController.forgotPassword);

router.get("/reset-password", userController.resetPasswordForm); // Serve the reset password form

router.post("/reset-password", userController.resetPassword); // Handle the form submission

module.exports = router;
