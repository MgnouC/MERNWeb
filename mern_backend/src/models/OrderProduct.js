const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orderItems: [
      {
        name: { type: String, required: true },
        quantity: { type: Number },
        image: { type: String },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
       
      },
    ],
    shippingAddress: {
      fullName: { type: String },
      address: { type: String, required: true },
      city: { type: String },
      country: { type: String },
      phone: { type: Number, required: true },
    },
    paymentMethod: { type: String, required: true },
    itemPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    taxPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true },
    isDelivered: { type: Boolean, default: false },
    delieveredAt: { type: Date },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
