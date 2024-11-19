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

module.exports = {
  createOrder,
  updateProductStock,
  getOrderDetails,
  cancelOrder
};
