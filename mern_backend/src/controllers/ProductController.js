const ProductService = require("../services/ProductService");

const createProduct = async (req, res) => {
  try {
    console.log("Received data:", req.body);
    const { name, type, price, image, description, rating, countInStock } =
      req.body;
    if (
      !name ||
      !type ||
      !countInStock ||
      !price ||
      !rating ||
      !description ||
      !image
    ) {
      return res.status(200).json({
        status: "ERR",
        message: "Loi roi",
      });
    }
    // Tạo tên file ảnh
    const filename = `${Date.now()}.png`; // Hoặc .jpg tùy định dạng

    // Lưu ảnh từ base64 xuống file
    saveImage(image, filename);
    const response = await ProductService.createProduct(req.body);
    return res.status(201).json(response);
  } catch (e) {
    return res.status(500).json({
      message: e.message || "Có lỗi xảy ra khi tạo sản phẩm",
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const data = req.body;
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
      Number(limit) || 8,
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
