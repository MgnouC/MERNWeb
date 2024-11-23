import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL_BACKEND,
  headers: {
    Accept: "application/json",
  },
});

export const getConfig = async () => {
  try {
    const response = await axiosInstance.get(`payment/config`);
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw new Error("Unable to create order. Please try again later.");
  }
};



