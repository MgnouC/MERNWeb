const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const multer = require('multer');
//const upload = multer({ dest: 'uploads/' }); // Lưu file ảnh vào thư mục 'uploads'

const authMiddleware = (req, res, next) => {
  const token = req.headers.token?.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
    if (err) {
      return res.status(401).json({
        message: "The authetication",
      });
    }
    const { payload } = user;
    if (payload?.isAdmin) {
      next();
    } else {
      return res.status(401).json({
        message: "The authetication",
      });
    }
  });
};

const authUserMiddleware = (req, res, next) => {
  const token = req.headers.token?.split(" ")[1];
  const userId = req.params._id;
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
    if (err) {
      return res.status(401).json({
        message: "The authetication",
      });
    }
    const { payload } = user;
    if (payload?.isAdmin || payload?.id === userId) {
      next();
    } else {
      return res.status(401).json({
        message: "The authetication",
      });
    }
  });
};
module.exports = {
  authMiddleware,
  authUserMiddleware,
};
