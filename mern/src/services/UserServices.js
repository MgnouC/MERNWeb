import axios from "axios";

export const axiosJWT = axios.create();

export const loginUser = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL_BACKEND}/user/sign-in`,
    data
  );
  return res.data;
};

export const logoutUser = async () => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL_BACKEND}/user/sign-out`
  );
  return res.data;
};

export const signupUser = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL_BACKEND}/user/sign-up`,
    data
  );
  return res.data;
};

export const updateUser = async ({ id, data }) => {
  const res = await axios.put(
    `${process.env.REACT_APP_API_URL_BACKEND}/user/update-user/${id}`,
    data,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        //token: `Bearer ${access_token}`,
      },
    }
  );

  return res.data;
};

export const deleteUser = async (id, data) => {
  const res = await axios.delete(
    `${process.env.REACT_APP_API_URL_BACKEND}/user/delete-user/${id}`,
    data,
    { headers: { Accept: "application/json" } }
  );
  return res.data;
};

export const getDetailsUser = async (id, access_token) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL_BACKEND}/user/get-detail-user/${id}`,
    {
      headers: {
        token: `Bearer ${access_token}`, // Đảm bảo access_token không null hoặc undefined
      },
    }
  );
  return res.data;
};

// UserService.js
export const getAllUser = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL_BACKEND}/user/get-all`
  );
  return res.data;
};

export const refreshToken = async () => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL_BACKEND}/user/refresh-token`,
    {}, // Empty body if no data needed
    {
      withCredentials: true, // Include cookies
    }
  );
  return res.data;
};
