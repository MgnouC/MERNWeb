import axios from "axios";

// Cấu hình axios mặc định
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL_BACKEND,
  headers: {
    Accept: "application/json",
  },
});

export const getAllProduct = async (search) => {
  const url = search ? `/product/get-all?search=${search}` : `/product/get-all`;

  try {
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Unable to fetch products. Please try again later.");
  }
};

export const getProductType = async (type) => {
  const url = `/product/get-products-by-type?type=${encodeURIComponent(type)}`;

  try {
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching products by type:", error);
    throw new Error(
      "Unable to fetch products by type. Please try again later."
    );
  }
};

export const getDetailsProduct = async (id) => {
  try {
    const response = await axiosInstance.get(
      `/product/get-details-product/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching product details:", error);
    throw error.response?.data || { message: "Unknown error" };
  }
};

export const createProduct = async (data) => {
  try {
    const response = await axiosInstance.post(`/product/create-product`, data);
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw new Error("Unable to create product. Please try again later.");
  }
};

export const updateProduct = async ({ id, data }) => {
  try {
    const response = await axiosInstance.put(
      `/product/update-product/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw new Error("Unable to update product. Please try again later.");
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await axiosInstance.delete(
      `/product/delete-product/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw new Error("Unable to delete product. Please try again later.");
  }
};

export const getAllBrandTypes = async () => {
  try {
    const response = await axiosInstance.get(`/product/get-all-brand-types`);
    return response.data;
  } catch (error) {
    console.error("Error fetching brand types:", error);
    throw error.response?.data || { message: "Unknown error" };
  }
};

export const getAllType = async () => {
  try {
    const response = await axiosInstance.get(`/product/get-all-type`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product types:", error);
    throw error.response?.data || { message: "Unknown error" };
  }
};
