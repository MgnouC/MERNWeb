const express = require("express");
const routes = express.Router();
const productController = require("../controllers/ProductController");
const { authMiddleware } = require("../middleware/authMiddleware");
const multer = require("multer");

// Cấu hình Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + "." + file.mimetype.split("/")[1]
    );
  },
});

const fileFilter = (req, file, cb) => {
  // Chỉ cho phép các file hình ảnh
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("File không hợp lệ, chỉ cho phép file hình ảnh"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

// Route để tạo sản phẩm với ảnh
routes.post(
  "/create-product",
  //authMiddleware,
  upload.single("image"),
  productController.createProduct
);

routes.put(
  "/update-product/:id",
  //authMiddleware,
  upload.single("image"),
  productController.updateProduct
);

// Các route khác
routes.get("/get-details-product/:id", productController.getDetailsProduct);
routes.delete(
  "/delete-product/:id",
  authMiddleware,
  productController.deleteProduct
);
routes.get("/get-all", productController.getAllProduct);
routes.get("/get-all-type", productController.getAllType);
routes.get("/get-products-by-type", productController.getProductsByType);
routes.get("/get-all-brand-types", productController.getAllBrandTypes);
module.exports = routes;
