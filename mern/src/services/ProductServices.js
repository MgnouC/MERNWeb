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

export const updateProduct = async (id, data) => {
  const res = await axios.put(
    `${process.env.REACT_APP_API_URL_BACKEND}/product/update-product/${id}`,
    data,
    { headers: { Accept: "application/json" } }
  );
  return res.data;
};

export const deleteProduct = async (id,data) => {
  const res = await axios.delete(
    `${process.env.REACT_APP_API_URL_BACKEND}/product/delete-product/${id}`,
    data,
    { headers: { Accept: "application/json" } }
  );
  return res.data;
};
