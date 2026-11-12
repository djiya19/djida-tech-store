
const express = require("express");
const router = express.Router();

const Product = require("../models/Product");
const protect = require("../middleware/authMiddleware");

// GET all products (PUBLIC)
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      success: true,
      count: products.length,
      products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve products"
    });
  }
});

// GET one product by ID (PUBLIC)
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.status(200).json({
      success: true,
      product
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Invalid product ID"
    });
  }
});

// CREATE product (PROTECTED)
router.post("/", protect, async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create product",
      error: error.message
    });
  }
});

// UPDATE product (PROTECTED)
router.put("/:id", protect, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update product",
      error: error.message
    });
  }
});

// DELETE product (PROTECTED)
router.delete("/:id", protect, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully"
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to delete product"
    });
  }
});

module.exports = router;
