const Order = require("../models/OrderProduct");
const Product = require("../models/ProductModel");

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
        isPaid,
        paidAt,
        paymentResult,
      } = newOrder;

      // Kiểm tra số lượng sản phẩm
      for (const item of orderItems) {
        const product = await Product.findById(item.product);
        if (!product) {
          reject({ message: `Sản phẩm với ID ${item.product} không tồn tại`, status: 400 });
          return;
        }
        if (item.quantity > product.countInStock) {
          reject({
            message: `Sản phẩm "${product.name}" chỉ còn lại ${product.countInStock} sản phẩm`,
            status: 400,
          });
          return;
        }
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
        isPaid,
        paidAt,
        paymentResult,
      });

      // Cập nhật số lượng sản phẩm trong kho
      await updateProductStock(orderItems);

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

const updateProductStock = async (orderItems) => {
  for (const item of orderItems) {
    const product = await Product.findById(item.product);
    if (product) {
      product.countInStock -= item.quantity;
      if (product.countInStock < 0) {
        product.countInStock = 0;
      }
      await product.save();
    }
  }
};

const getOrderDetails = async (id) => {
  try {
    const orders = await Order.find({ user: id });
    if (!orders || orders.length === 0) {
      throw { message: "No orders found for this user", status: 400 };
    }

    // Iterate over the orders
    orders.forEach((order) => {
      console.log('Order ID:', order._id);
      if (order.orderItems && order.orderItems.length > 0) {
        console.log('Order Items:', order.orderItems);
      } else {
        console.log('Order has no items.');
      }
    });

    return {
      status: "OK",
      message: "SUCCESS",
      data: orders,
    };
  } catch (e) {
    console.error("Error in getOrderDetails:", e);
    throw { message: e.message || "An error occurred", status: 500 };
  }
};

const cancelOrder = async (orderId) => {
  try {
    const order = await Order.findById(orderId);
    if (!order) {
      throw { message: "Order not found", status: 404 };
    }
    if (order.isDelivered) {
      throw { message: "Cannot cancel delivered order", status: 400 };
    }

    // Kiểm tra số lượng sản phẩm trong orderItems
    console.log(`Order has ${order.orderItems.length} items`);

    // Cập nhật countInStock cho từng sản phẩm
    for (const item of order.orderItems) {
      try {
        console.log(`Processing item with product ID: ${item.product}`);
        const product = await Product.findById(item.product);
        if (product) {
          const quantity = item.amount || item.quantity || 1;
          product.countInStock += quantity;
          await product.save();
          console.log(`Updated countInStock for product ${product._id}`);
        } else {
          console.warn(`Product not found: ${item.product}`);
        }
      } catch (error) {
        console.error(`Error updating product ${item.product}:`, error);
      }
    }

    // Xóa đơn hàng
    await order.deleteOne();
    return {
      status: "OK",
      message: "Order cancelled successfully",
    };
  } catch (e) {
    console.error("Error in cancelOrder:", e);
    throw {
      message: e.message || "An error occurred",
      status: e.status || 500,
    };
  }
};
const getAllOrder = () => {
  return new Promise(async (resolve, reject) => {
    try {
      //const checkUser = await User.findOne({ _id: id })
      const allOrder = await Order.find().sort({ createdAt: -1 });
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: allOrder,
      });
    } catch (e) {
      reject(e);
    }
  });
};
const getAllOrderAdmin = () => {
  return new Promise(async (resolve, reject) => {
    try {
      //const checkUser = await User.findOne({ _id: id })
      const allOrder = await Order.find().sort({ createdAt: -1 });
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: allOrder,
      });
    } catch (e) {
      reject(e);
    }
  });
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
  updateProductStock,
  getOrderDetails,
  cancelOrder,
  getAllOrder,
  updateOrderStatus
};
