const ProductServiceCustomer = require('../services/ProductService');

const fs = require("fs"); // Import fs module
// const { getProductById } = require("../services/ProductService");

const createProduct = async (req, res) => {
  try {
    const { name, type, price, description, rating, countInStock } = req.body;
    const file = req.file; // Lấy file

    if (!file) {
      return res.status(400).json({
        status: "ERR",
        message: "File không được cung cấp",
      });
    }

    // Đọc file và chuyển đổi sang base64

    const base64 = fs.readFileSync(file.path).toString("base64"); // Đọc file từ đường dẫn

    const filename = file.filename; // Sử dụng tên file đã lưu

    // Kiểm tra thông tin
    if (!name || !type || !countInStock || !price || !rating || !description) {
      return res.status(400).json({
        status: "ERR",
        message: "Thiếu thông tin sản phẩm",
      });
    }

    // Gửi đến service để lưu sản phẩm
    const response = await ProductServiceCustomer.createProduct({
      name,
      type,
      price,
      description,
      rating,
      countInStock,
      image: filename, // Lưu filename
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
    const productId = req.params.id; // Lấy ID từ params
    const data = req.body; // Dữ liệu cập nhật sản phẩm
    const file = req.file; // Lấy file ảnh (nếu có)

    // Kiểm tra ID sản phẩm
    if (!productId) {
      return res.status(400).json({
        status: "ERR",
        message: "The ProductID is required",
      });
    }

    // Nếu có ảnh mới, cập nhật ảnh vào dữ liệu sản phẩm
    if (file) {
      const filename = file.filename; // Lấy tên file ảnh
      data.image = filename; // Cập nhật tên file ảnh vào data
    }

    // Gọi service để cập nhật sản phẩm
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
    console.log("Received Product ID:", productId); 
    if (!productId) {
      return res.status(400).json({
        status: "ERR",
        message: "The ProductId is required",
      });
    }

    const response = await ProductServiceCustomer.getProductById(productId);
    console.log("Product details fetched:", response); // Log kết quả trả về từ hàm
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
      return res.status(200).json({
        status: "ERR",
        message: "The ProductId is required",
      });
    }

    const response = await ProductServiceCustomer.deleteProduct(productId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
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
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
  createProduct,
  updateProduct,
  getDetailsProduct,
  deleteProduct,
  getAllProduct,
};
