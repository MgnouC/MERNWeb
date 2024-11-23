const express = require("express");
const routes = express.Router();
const dotenv = require("dotenv");
const {
  authMiddleware,
  authUserMiddleware,
} = require("../middleware/authMiddleware");
const multer = require("multer");
dotenv.config()
routes.get("/config", (req, res) => {
    return res.status(404).json({
        status: "OK",
        data: process.env.CLIENT_ID,
    })
});

module.exports = routes;
