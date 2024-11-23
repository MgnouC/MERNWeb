import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL_BACKEND,
  headers: {
    Accept: "application/json",
  },
});

export const createOrder = async (data) => {
  try {
    const response = await axiosInstance.post(`order/create`, data);
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw new Error("Unable to create order. Please try again later.");
  }
};


export const getOrderDetails = async (id) => {
  return axiosInstance.get(`/order/get-order-details/${id}`);
};

export const cancelOrder = (orderId) => {
  return axiosInstance.delete(`/order/cancel/${orderId}`);
};

export const getAllOrder = () => {
  return axiosInstance.get(`/order/get-all-order`);
};


export const updateOrderStatus = (orderId, isDelivered) => {
  return axiosInstance.put("/order/update-order-status", { orderId, isDelivered });
};
