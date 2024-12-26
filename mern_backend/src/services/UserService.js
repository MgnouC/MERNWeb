const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const { generalAccessToken, generalRefreshToken } = require("./JwtService");

const createUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { email, password, confirmPassword } = newUser;
    try {
      const checkUser = await User.findOne({ email });
      if (checkUser) {
        reject({ message: "Email already exists", status: 400 });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log(hashedPassword);
      const createUser = await User.create({
        email,
        password: hashedPassword,
        confirmPassword: hashedPassword,
      });
      if (createUser) {
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: createUser,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const loginUser = (userLogin) => {
  return new Promise(async (resolve, reject) => {
    const { email, password } = userLogin;
    try {
      const checkUser = await User.findOne({ email });
      if (checkUser === null) {
        reject({ message: "Email not found", status: 400 });
      }
      // Trong logic loginUser
      if (checkUser.isBanned) {
        reject({
          message: "Tài khoản của bạn đã bị vô hiệu hóa.",
          status: 403,
        });
        return;
      }

      const comparePassword = await bcrypt.compare(
        password,
        checkUser.password
      );
      if (!comparePassword) {
        reject({ message: "Password is incorrect", status: 400 });
      }
      const access_token = await generalAccessToken({
        id: checkUser.id,
        isAdmin: checkUser.isAdmin,
      });
      const refreshToken = await generalRefreshToken({
        id: checkUser.id,
        isAdmin: checkUser.isAdmin,
      });

      resolve({
        status: "OK",
        message: "SUCCESS",
        access_token,
        refreshToken,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const updateUser = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({ _id: id });
      console.log("checkuser", checkUser);
      if (checkUser === null) {
        reject({ message: "User not found", status: 400 });
      }

      await User.updateOne({ _id: id }, { $set: data });

      const updatedUser = await User.findOne({ _id: id });

      console.log("updatedUser", updatedUser);
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: updatedUser,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({ _id: id });
      if (checkUser === null) {
        reject({ message: "User not found", status: 400 });
      }

      await User.deleteOne({ _id: id });

      resolve({
        status: "OK",
        message: "Delete user success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      //const checkUser = await User.findOne({ _id: id })
      const allUser = await User.find().sort({ createdAt: -1 });
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: allUser,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getDetailsUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({ _id: id });
      if (checkUser === null) {
        reject({ message: "User not found", status: 400 });
      }
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: checkUser,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const banUser = async (req, res) => {
  const { id } = req.params;
  const { ban } = req.body;
  try {
    const userBanned = await User.findById(id);
    if (!userBanned) return res.status(404).json({message: "User not found"});
    userBanned.isBanned = ban;
    await userBanned.save();
    console.log("updatedUser", userBanned);

    return res.status(200).json({ status: "Banned", message: "User ban status updated", data: userBanned });
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};
// const banUser = (id, data) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const checkUser = await User.findOne({ _id: id });
//       console.log("checkuser", checkUser);
//       if (checkUser === null) {
//         reject({ message: "User not found", status: 400 });
//       }

//       await User.updateOne({ _id: id }, { $set: data });

//       const updatedUser = await User.findOne({ _id: id });

//       console.log("updatedUser", updatedUser);
//       resolve({
//         status: "OK",
//         message: "SUCCESS",
//         data: updatedUser,
//       });
//     } catch (e) {
//       reject(e);
//     }
//   });
// };
module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllUser,
  getDetailsUser,
  banUser,
};
