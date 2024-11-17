const express = require("express");
const routes = express.Router();
const orderController = require("../controllers/OrderController");
const {
  authMiddleware,
  authUserMiddleware,
} = require("../middleware/authMiddleware");
const multer = require("multer");

routes.post("/create", orderController.createOrder);
module.exports = routes;
