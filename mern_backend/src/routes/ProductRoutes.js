const express = require("express");
const routes = express.Router();
const productController = require("../controllers/ProductController");
const { authMiddleware } = require("../middleware/authMiddleware");
// Cấu hình multer đã tạo ở bước trước
const multer = require("multer");
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
const upload = multer({ storage: storage });

// Route để tạo sản phẩm với ảnh

routes.post(
  "/create-product",
  upload.single("image"),
  productController.createProduct
);
routes.put(
  "/update-product/:id",
  upload.single("image"),
  productController.updateProduct
);
routes.get("/get-details-product/:id", productController.getDetailsProduct);
routes.delete("/delete-product/:id", productController.deleteProduct);
routes.get("/get-all", productController.getAllProduct);

module.exports = routes;
