const Order = require("../models/OrderProduct");
const OrderService = require("../services/OrderService");
const { sendOrderDeliveredEmail } = require('../services/EmailService');

const createOrder = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
      user,
      isPaid,
      paidAt,
      paymentResult,
    } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }

    const newOrder = {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
      user,
      isPaid,
      paidAt,
      paymentResult,
    };

    const response = await OrderService.createOrder(newOrder);
    res.status(201).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating order", error: error.message });
  }
};


const getOrderDetails = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(400).json({
        status: "ERR",
        message: "The userId is required",
      });
    }

    const response = await OrderService.getOrderDetails(userId);
    //console.log(response);
    return res.status(200).json(response);
  } catch (e) {
    console.error("Error in getDetailsProduct:", e);
    return res.status(404).json({
      message: e.message || "An error occurred",
    });
  }
};

const cancelOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const response = await OrderService.cancelOrder(orderId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(e.status || 500).json({
      message: e.message || "An error occurred",
    });
  }
};

const getAllOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const response = await OrderService.getAllOrder();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(e.status || 500).json({
      message: e.message || "An error occurred",
    });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, isDelivered } = req.body;

    // Tìm đơn hàng theo ID
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Cập nhật trạng thái giao hàng
    order.isDelivered = isDelivered;
    if (isDelivered && order.paymentMethod === "COD") {
      order.isPaid = true; // Nếu là COD và đã giao hàng, cập nhật đã thanh toán
    }

    const updatedOrder = await order.save();
    sendOrderDeliveredEmail(order.user.email, order);
    console.log(sendOrderDeliveredEmail)

    res.status(200).json({
      message: "Order updated successfully",
      data: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrder,
  getOrderDetails,
  cancelOrder,
  getAllOrder,
  updateOrderStatus,
  
};
