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

module.exports = {
  createOrder,
};
