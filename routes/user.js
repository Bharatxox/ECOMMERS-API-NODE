const express = require("express");
const userController = require("../controller/user");

const router = express.Router();

router.post("/signup", userController.signup);

router.post("/login", userController.login);

router.post("/forgot-password", userController.forgotPassword);

router.get("/reset-password", userController.resetPasswordForm); // Serve the reset password form

router.post("/reset-password", userController.resetPassword); // Handle the form submission

module.exports = router;
