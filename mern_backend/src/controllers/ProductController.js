const ProductServiceCustomer = require('../services/ProductService');
const fs = require("fs");

const createProduct = async (req, res) => {
  try {
    const { name, type, price, description, rating, countInStock } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        status: "ERR",
        message: "File không được cung cấp",
      });
    }

    // Lưu thông tin sản phẩm
    if (!name || !type || !countInStock || !price || !rating || !description) {
      return res.status(400).json({
        status: "ERR",
        message: "Thiếu thông tin sản phẩm",
      });
    }

    const response = await ProductServiceCustomer.createProduct({
      name,
      type,
      price,
      description,
      rating,
      countInStock,
      image: file.filename, // Chỉ cần lưu filename
    });

    return res.status(201).json(response);
  } catch (e) {
    console.error("Error creating product:", e);
    return res.status(500).json({
      message: e.message || "Có lỗi xảy ra khi tạo sản phẩm",
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const data = req.body;
    const file = req.file;

    if (!productId) {
      return res.status(400).json({
        status: "ERR",
        message: "The ProductID is required",
      });
    }

    if (file) {
      data.image = file.filename; // Cập nhật tên file ảnh vào data
    }

    const response = await ProductServiceCustomer.updateProduct(productId, data);

    return res.status(200).json({
      status: "OK",
      message: "Product updated successfully",
      data: response,
    });
  } catch (e) {
    console.error("Error updating product:", e);
    return res.status(500).json({
      status: "ERR",
      message: e.message || "Có lỗi xảy ra khi cập nhật sản phẩm",
    });
  }
};

const getDetailsProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    if (!productId) {
      return res.status(400).json({
        status: "ERR",
        message: "The ProductId is required",
      });
    }

    const response = await ProductServiceCustomer.getProductById(productId);
    return res.status(200).json(response);
  } catch (e) {
    console.error("Error in getDetailsProduct:", e);
    return res.status(404).json({
      message: e.message || "An error occurred",
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    if (!productId) {
      return res.status(400).json({
        status: "ERR",
        message: "The ProductId is required",
      });
    }

    const response = await ProductServiceCustomer.deleteProduct(productId);
    return res.status(200).json(response);
  } catch (e) {
    console.error("Error deleting product:", e);
    return res.status(500).json({
      status: "ERR",
      message: e.message || "An error occurred while deleting the product",
    });
  }
};

const getAllProduct = async (req, res) => {
  try {
    const { limit, page, sort, filter, search } = req.query;
    const response = await ProductServiceCustomer.getAllProduct(
      Number(page) || 0,
      sort,
      filter,
      search
    );

    return res.status(200).json(response);
  } catch (e) {
    console.error("Error in getAllProduct:", e);
    return res.status(500).json({
      message: e.message || "An error occurred",
    });
  }
};

const getAllType = async (req, res) => {
  try {
    const response = await ProductServiceCustomer.getAllType();
    return res.status(200).json(response);
  } catch (e) {
    console.error("Error in getAllType:", e);
    return res.status(500).json({
      message: e.message || "An error occurred",
    });
  }
};

const getProductsByType = async (req, res) => {
  try {
    const { type } = req.query;

    if (!type) {
      return res.status(400).json({
        status: "FAIL",
        message: "Product type is required",
      });
    }

    const response = await ProductServiceCustomer.getProductType(type);
    return res.status(200).json(response);
  } catch (e) {
    console.error("Error while fetching products by type:", e);
    return res.status(500).json({
      status: "ERROR",
      message: e.message || "An error occurred",
    });
  }
};

module.exports = {
  createProduct,
  updateProduct,
  getDetailsProduct,
  deleteProduct,
  getAllProduct,
  getAllType,
  getProductsByType,
};
