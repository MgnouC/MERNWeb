import axios from "axios";

export const getAllProduct = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL_BACKEND}/product/get-all`
  );
  return res.data;
};

export const createProduct = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL_BACKEND}/product/create-product`,
    data,
    { headers: { Accept: "application/json" } }
  );
  return res.data;
};
