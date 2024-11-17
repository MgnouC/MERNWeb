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
};

// Order slice without createAsyncThunk
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    // Add a product to the order
    addOrderProduct: (state, action) => {
      const item = action.payload;
      const existItem = state.orderItems.find((x) => x._id === item._id);

      if (existItem) {
        // If the product already exists, update the quantity
        existItem.quantity += item.quantity;
      } else {
        // If the product doesn't exist, add it to the array
        state.orderItems.push(item);
      }
    },

    // Update product quantity in the order
    updateOrderProductQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.orderItems.find((item) => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },

    // Remove a product from the order
    removeOrderProduct: (state, action) => {
      const productId = action.payload;
      state.orderItems = state.orderItems.filter((item) => item.id !== productId);
    },

    // Set the shipping address for the order
    setShippingAddress: (state, action) => {
      state.shippingAddress = {
        ...state.shippingAddress,
        ...action.payload,
      };
    },

    // Set the payment method for the order
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },

    // Set the prices for the order
    setPrices: (state, action) => {
      const { itemPrice, shippingPrice, taxPrice, totalPrice } = action.payload;
      state.itemPrice = itemPrice;
      state.shippingPrice = shippingPrice;
      state.taxPrice = taxPrice;
      state.totalPrice = totalPrice;
    },

    // Reset the order state
    resetOrderState: () => initialState,
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
} = orderSlice.actions;
export default orderSlice.reducer;
