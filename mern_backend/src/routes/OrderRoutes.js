const express = require("express");
const routes = express.Router();
const orderController = require("../controllers/OrderController");
const {
  authMiddleware,
  authUserMiddleware,
} = require("../middleware/authMiddleware");
const multer = require("multer");

routes.post("/create", orderController.createOrder);
routes.get("/get-order-details/:id", orderController.getOrderDetails);
routes.delete("/cancel/:id", orderController.cancelOrder);

module.exports = routes;
