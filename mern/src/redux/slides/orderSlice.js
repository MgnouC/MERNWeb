// orderSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Initial state based on the OrderProductModel schema
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
  userOrders: [], // Thêm mảng lưu danh sách đơn hàng của người dùng
};

// Order slice without createAsyncThunk
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
      state.orderItems = state.orderItems.filter((item) => item.id !== productId);
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
      state.userOrders = state.userOrders.filter((order) => order._id !== orderId);
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
} = orderSlice.actions;
export default orderSlice.reducer;
