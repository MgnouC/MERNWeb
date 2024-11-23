// orderSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderItems: [],
  shippingAddress: {
    name: "",
    address: "",
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
  userOrders: [], // Danh sách đơn hàng của admin
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    // Các reducers hiện có
    addOrderProduct: (state, action) => {
      const item = action.payload;
      const existItem = state.orderItems.find((x) => x.id === item.id);

      if (existItem) {
        const newQuantity = existItem.quantity + item.quantity;
        if (newQuantity > item.countInStock) {
          existItem.quantity = item.countInStock;
        } else {
          existItem.quantity = newQuantity;
        }
      } else {
        state.orderItems.push({ ...item, quantity: item.quantity });
      }
    },
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
    setShippingAddress: (state, action) => {
      state.shippingAddress = {
        ...state.shippingAddress,
        ...action.payload,
      };
    },
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
    setPrices: (state, action) => {
      const { itemPrice, shippingPrice, taxPrice, totalPrice } = action.payload;
      state.itemPrice = itemPrice;
      state.shippingPrice = shippingPrice;
      state.taxPrice = taxPrice;
      state.totalPrice = totalPrice;
    },
    resetOrderState: () => initialState,

    // Thêm các reducers mới
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setUserOrders: (state, action) => {
      state.userOrders = action.payload;
    },

    cancelUserOrder: (state, action) => {
      const orderId = action.payload;
      state.userOrders = state.userOrders.filter(
        (order) => order._id !== orderId
      );
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setUserOrders: (state, action) => {
      state.userOrders = action.payload;
    },
    cancelUserOrder: (state, action) => {
      const orderId = action.payload;
      state.userOrders = state.userOrders.filter(
        (order) => order._id !== orderId
      );
    },
    updateOrderStatus: (state, action) => {
      const { orderId, isDelivered, isPaid } = action.payload;

      const orderIndex = state.userOrders.findIndex(
        (order) => order._id === orderId
      );
      if (orderIndex !== -1) {
        state.userOrders[orderIndex].isDelivered = isDelivered;
        state.userOrders[orderIndex].isPaid = isPaid;
      }
    },
  },
});

export const {
  addOrderProduct,
  updateOrderProductQuantity,
  removeOrderProduct,
  setShippingAddress,
  setPaymentMethod,
  setPrices,
  resetOrderState,
  setLoading,
  setError,
  setUserOrders,
  cancelUserOrder,
  updateOrderStatus,
} = orderSlice.actions;
export default orderSlice.reducer;
