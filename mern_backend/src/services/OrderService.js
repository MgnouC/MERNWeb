const Order = require("../models/OrderProduct");

const createOrder = (newOrder) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Lấy thông tin từ đối tượng newOrder
      const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
        user,
      } = newOrder;

      // Kiểm tra xem đơn hàng có chứa sản phẩm hay không
      if (!orderItems || orderItems.length === 0) {
        reject({ message: "No order items", status: 400 });
        return;
      }

      // Tạo một đơn hàng mới
      const createdOrder = await Order.create({
        orderItems,
        shippingAddress,
        paymentMethod,
        itemPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
        user,
      });

      // Trả về đơn hàng đã tạo thành công
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: createdOrder,
      });
    } catch (e) {
      reject({
        message: e.message || "Internal Server Error",
        status: 500,
      });
    }
  });
};

module.exports = {
  createOrder,
};
