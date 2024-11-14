import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Initial state based on the OrderProductModel schema
const initialState = {
  orderItems: [],
  shippingAddress: {
    fullName: "",
    address: "",
    city: "",
    country: "",
    phone: "",
  },
  paymentMethod: "",
  itemPrice: 0,
  shippingPrice: 0,
  taxPrice: 0,
  totalPrice: 0,
  isPaid: false,
  paidAt: null,
  user: null,
  isDelivered: false,
  deliveredAt: null,
  loading: false,
  error: null,
};

// Async thunk for creating an order
export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/orders", orderData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

// Async thunk for fetching order details
export const getOrderDetails = createAsyncThunk(
  "order/getOrderDetails",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/orders/${orderId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

// Order slice
const orderSlice = createSlice({
  name: "order",
  initialState: { shippingAddress: {},   orderItems: [] },
  reducers: {
    // Trong orderSlice.js
    addOrderProduct: (state, action) => {
      const item = action.payload;
      const existItem = state.orderItems.find((x) => x._id === item._id);

      if (existItem) {
        // Nếu sản phẩm đã tồn tại, cập nhật số lượng
        existItem.quantity += item.quantity;
      } else {
        // Nếu sản phẩm chưa tồn tại, thêm vào mảng
        state.orderItems.push(item);
      }
    },

    // Trong orderSlice.js
    updateOrderProductQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.orderItems.find((item) => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },

    removeOrderProduct: (state, action) => {
      const productId = action.payload;
      state.orderItems = state.orderItems.filter(
        (item) => item.id !== productId
      );
    },
    // Thêm vào reducers trong orderSlice
    setShippingAddress(state, action) {
      state.shippingAddress = {
        ...state.shippingAddress,
        ...action.payload,
      }
    },
    resetOrderState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Handle createOrder actions
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        Object.assign(state, action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle getOrderDetails actions
      .addCase(getOrderDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        Object.assign(state, action.payload);
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
      builder.addCase(setShippingAddress, (state, action) => {
        state.shippingAddress = action.payload;
      });
  },
});

export const {
  addOrderProduct,
  resetOrderState,
  updateOrderProductQuantity,
  removeOrderProduct,
  setShippingAddress,
} = orderSlice.actions;
export default orderSlice.reducer;
