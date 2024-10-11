const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const generalAccessToken = async (payload) => {
  const accessToken = jwt.sign(
    {
      ...payload,
    },
    process.env.ACCESS_TOKEN,
    { expiresIn: "30s" }
  );
  return accessToken;
};

const generalRefreshToken = async (payload) => {
  const refreshToken = jwt.sign(
    {
      ...payload,
    },
    process.env.REFRESH_TOKEN,
    { expiresIn: "365d" }
  );
  return refreshToken;
};

// const refreshTokenJWTService = async (payload) => {
//     const refreshToken = jwt.sign({
//         payload
//     }, process.env.REFRESH_TOKEN, {expiresIn: '365d'})
//     return refreshTokenJWTService
// }

const refreshTokenJWTService = (token) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("token", token);
      jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
        if (err) {
          resolve({
            status: "ERROR",
            message: "The authetication token is invalid",
          });
        }
        const { payload } = user;
        const access_token = await generalAccessToken({
          id: payload?._id,
          isAdmin: payload?.isAdmin,
        });
        console.log("access_token", access_token);
        resolve({
          status: "OK",
          message: "SUCCESS",
          access_token,
        });
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  generalAccessToken,
  generalRefreshToken,
  refreshTokenJWTService,
};
