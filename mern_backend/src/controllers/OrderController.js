const OrderService = require("../services/OrderService");

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
      user, // Lấy user từ req.body
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
      user, // Sử dụng user từ req.body
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
module.exports = {
  createOrder,
  getOrderDetails,
  cancelOrder
};
