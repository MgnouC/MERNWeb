const ProductService = require("../services/ProductService");
const fs = require("fs"); // Import fs module

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
    const response = await ProductService.createProduct({
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
  //console.log(req.params); 
  try {
    const productId = req?.params?.id;  // Sửa từ _id thành id
    const data = req.body;
    console.log("Received data:", data);
    if (!productId) {
      return res.status(200).json({
        status: "ERR",
        message: "The ProductID is required",
      });
    }

    const response = await ProductService.updateProduct(productId, data);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getDetailsProduct = async (req, res) => {
  try {
    const ProductId = req.params.id;
    if (!ProductId) {
      return res.status(200).json({
        status: "ERR",
        message: "The ProductId is required",
      });
    }

    const response = await ProductService.getDetailsProduct(ProductId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
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

    const response = await ProductService.deleteProduct(productId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllProduct = async (req, res) => {
  try {
    const { limit, page, sort, filter } = req.query;
    const response = await ProductService.getAllProduct(
      Number(page) || 0,
      sort,
      filter
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
