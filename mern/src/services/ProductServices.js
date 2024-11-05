import axios from "axios";

export const getAllProduct = async (search) => {
  // Update the URL based on the backend structure
  const url = search
    ? `${process.env.REACT_APP_API_URL_BACKEND}/product/get-all?search=${search}`
    : `${process.env.REACT_APP_API_URL_BACKEND}/product/get-all`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

// Update the URL based on the backend structure
export const getDetailsProduct = (id) => {
  return axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/product/get-details-product/${id}`)
    .then(response => response.data)
    .catch(error => {
      throw error.response?.data || { message: 'Unknown error' };
    });
};

//routes.get("/get-all-type", productController.getAllType);
export const getAllType = () => {
  return axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/product/get-all-type`)
    .then(response => response.data)
    .catch(error => {
      throw error.response?.data || { message: 'Unknown error' };
    });
};

export const createProduct = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL_BACKEND}/product/create-product`,
    data,
    { headers: { Accept: "application/json" } }
  );
  return res.data;
};

export const updateProduct = async ({ id, data }) => {
  // Chấp nhận đối tượng
  const res = await axios.put(
    `${process.env.REACT_APP_API_URL_BACKEND}/product/update-product/${id}`, // Sử dụng ID trong URL
    data,
    {
      headers: {
        Accept: "application/json",
      },
    }
  );
  return res.data;
};

// export const updateProduct = async (id, data) => {
//   const res = await axios.put(
//     `${process.env.REACT_APP_API_URL_BACKEND}/product/update-product/${id}`,
//     data,
//     {
//       headers: {
//         Accept: "application/json",
//       },
//     }
//   );
//   return res.data;
// };

export const deleteProduct = async (id, data) => {
  const res = await axios.delete(
    `${process.env.REACT_APP_API_URL_BACKEND}/product/delete-product/${id}`,
    data,
    { headers: { Accept: "application/json" } }
  );
  return res.data;
};
