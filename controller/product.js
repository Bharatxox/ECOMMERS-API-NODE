const ProductModule = require("../models/product");

const listProduct = async (req, res) => {
  const pageSize = req.query.pageSize; //no of item per page
  const pageNo = req.query.pageNo; //current page no

  const filterProduct = {};
  const {
    title,
    description,
    brand,
    category,
    minPrice,
    maxPrice,
    maxDiscount,
    minDiscount,
    maxRating,
    minRating,
    sortDiscount,
    sortRating,
  } = req.query;

  if (title) {
    filterProduct.title = {
      $regex: new RegExp(`${title}`, "gi"),
    };
  }
  if (description) {
    filterProduct.description = {
      $regex: new RegExp(`${description}`, "gi"),
    };
  }
  if (brand) {
    filterProduct.brand = {
      $regex: new RegExp(`${brand}`, "gi"),
    };
  }
  if (category) {
    filterProduct.category = {
      $regex: new RegExp(`${category}`, "gi"),
    };
  }
  if (minPrice || maxPrice) {
    filterProduct.price = {};
    if (minPrice) {
      filterProduct.price.$gte = parseFloat(minPrice);
    }
    if (maxPrice) {
      filterProduct.price.$lte = parseFloat(maxPrice);
    }
  }
  if (minDiscount || maxDiscount) {
    filterProduct.discountPercentage = {};
    if (minDiscount) {
      filterProduct.discountPercentage.$gte = parseFloat(minDiscount);
    }
    if (maxDiscount) {
      filterProduct.discountPercentage.$lte = parseFloat(maxDiscount);
    }
  }
  if (minRating || maxRating) {
    filterProduct.rating = {};
    if (minRating) {
      filterProduct.rating.$gte = parseFloat(minRating);
    }
    if (maxRating) {
      filterProduct.rating.$lte = parseFloat(maxRating);
    }
  }
  let sortOptions = {};
  if (sortDiscount) {
    sortOptions.discountPercentage = sortDiscount === "asc" ? 1 : -1;
  }
  if (sortRating) {
    sortOptions.rating = sortRating === "asc" ? 1 : -1;
  }

  const productList = await ProductModule.find(filterProduct)
    .limit(pageSize)
    .skip((pageNo - 1) * 10)
    .sort(sortOptions);

  res.json({
    sucess: true,
    message: "product list api",
    result: productList,
  });
};

const createProduct = async (req, res) => {
  //add the validation
  const newlyInsertedProduct = await ProductModule.create(req.body);
  res.status(201).json({
    status: "success",
    message: "product create api",
    data: newlyInsertedProduct,
  });
};

const updateProduct = async (req, res) => {
  productId = req.params.productId;
  await ProductModule.findByIdAndUpdate(productId, { $set: req.body });
  res.status(200).json({
    status: "success",
    message: "product updated successfully",
  });
};

const deleteProduct = async (req, res) => {
  productId = req.params.productId;
  //we dont delete the actual data from the DB instead we apply the flag as isActive where we store true and false
  await ProductModule.findByIdAndUpdate(productId, {
    $set: { isActive: false },
  });
  // await ProductModule.findByIdAndDelete(productId);
  res.json({ status: "success", message: "product deleted successfully" });
};

const productController = {
  listProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};

module.exports = productController;
