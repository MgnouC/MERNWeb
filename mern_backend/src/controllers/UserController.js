const UserService = require("../services/UserService");
const JwtService = require("../services/JwtService");

const createUser = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;
    const reg = /^\w+([+.-]?\w+)*@\w+([-.]?\w+)*\.\w+([-.]?\w+)*$/;
    const isCheckEmail = reg.test(email);

    if (!email || !password || !confirmPassword) {
      return res.status(200).json({
        status: "ERR",
        message: "Sai rồi nhập lại đi",
      });
    } else if (!isCheckEmail) {
      return res.status(200).json({
        status: "ERR",
        message: "Sai email rồi ",
      });
    } else if (password !== confirmPassword) {
      return res.status(200).json({
        status: "ERR",
        message: "Sai password rồi ",
      });
    }

    const response = await UserService.createUser(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const reg = /^\w+([+.-]?\w+)*@\w+([-.]?\w+)*\.\w+([-.]?\w+)*$/;
    const isCheckEmail = reg.test(email);

    if (!email || !password) {
      return res.status(200).json({
        status: "ERR",
        message: "Sai rồi nhập lại đi",
      });
    } else if (!isCheckEmail) {
      return res.status(200).json({
        status: "ERR",
        message: "Sai email rồi ",
      });
    }

    const response = await UserService.loginUser(req.body);
    const { refreshToken, ...newResponse } = response;
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      samesite: "strict",
    });
    return res.status(200).json(newResponse);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const logoutUser = async (req, res) => {
  try {
    // Xóa cookie refreshToken
    res.clearCookie("refreshToken", { path: '/' });
    return res.status(200).json({
      status: "OK",
      message: "The user has been logged out",
    });
  } catch (e) {
    return res.status(500).json({
      message: "An error occurred during logout",
      error: e.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req?.params?.id;
    const data = req.body;
    console.log("Received data:", data);

    if (!userId) {
      return res.status(200).json({
        status: "ERR",
        message: "The UserID is required",
      });
    }

    const response = await UserService.updateUser(userId, data);
    console.log("Update response:", response);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    // const token = req.headers
    if (!userId) {
      return res.status(200).json({
        status: "ERR",
        message: "The UserID is required",
      });
    }

    const response = await UserService.deleteUser(userId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllUser = async (req, res) => {
  try {
    const response = await UserService.getAllUser();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getDetailsUser = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(200).json({
        status: "ERR",
        message: "The UserID is required",
      });
    }

    const response = await UserService.getDetailsUser(userId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const refreshToken = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) {
      return res.status(200).json({
        status: "ERR",
        message: "The token is required",
      });
    }

    const response = await JwtService.refreshTokenJWTService(token);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};




module.exports = {
  createUser,
  loginUser,
  logoutUser,
  updateUser,
  deleteUser,
  getAllUser,
  getDetailsUser,
  refreshToken,
};
