const express = require("express");
const productController = require("../controller/product");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();
// router.use(authMiddleware)

router.get("/list", authMiddleware, productController.listProduct);

router.post(
  "/create",
  authMiddleware,
  roleMiddleware(["SELLER", "ADMIN"]),
  productController.createProduct
);

router.post(
  "/update/:productId",
  authMiddleware,
  roleMiddleware(["SELLER"]),
  productController.updateProduct
);

router.delete(
  "/delete/:productId",
  authMiddleware,
  roleMiddleware(["SELLER", "ADMIN"]),
  productController.deleteProduct
);

module.exports = router;
