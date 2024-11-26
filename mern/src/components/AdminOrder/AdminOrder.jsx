import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Tag, Button, Modal, message } from "antd";
import {
  OrderContainer,
  WrapperHeader,
  StyledTable,
  ActionButton,
} from "./style";
import * as OrderService from "../../services/OrderService";
import {
  setUserOrders,
  setLoading,
  setOrders,
  setError,
  updateOrderStatus,
} from "../../redux/slides/orderSlice";
import * as XLSX from "xlsx";
import { ExclamationCircleOutlined } from "@ant-design/icons";
const { confirm } = Modal;

const AdminOrderPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const orders = useSelector((state) => state.order.userOrders);
  const loading = useSelector((state) => state.order.loading);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        dispatch(setLoading(true));
        const response = await OrderService.getAllOrder();
        if (Array.isArray(response.data)) {
          dispatch(setUserOrders(response.data));
        } else if (response.data && Array.isArray(response.data.data)) {
          dispatch(setUserOrders(response.data.data));
        } else {
          dispatch(setUserOrders([]));
        }
        dispatch(setLoading(false));
      } catch (error) {
        dispatch(setError(error.message));
        dispatch(setLoading(false));
        message.error("Lỗi khi tải danh sách đơn hàng");
      }
    };

    fetchAllOrders();
  }, [dispatch]);

  const handleUpdateDeliveryStatus = async (orderId, isDelivered) => {
    try {
      const response = await OrderService.updateOrderStatus(
        orderId,
        isDelivered
      );

      // Cập nhật trạng thái giao hàng và thanh toán trong Redux
      dispatch(
        updateOrderStatus({
          orderId,
          isDelivered: response.data.data.isDelivered,
          isPaid: response.data.data.isPaid,
        })
      );

      message.success("Cập nhật trạng thái giao hàng thành công!");
    } catch (error) {
      console.error("Error updating delivery status:", error);
      message.error("Cập nhật trạng thái giao hàng thất bại!");
    }
  };

  const showOrderDetails = (order) => {
    setSelectedOrder(order);
    setIsModalVisible(true);
  };

  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "_id",
      key: "_id",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Người dùng",
      dataIndex: "user",
      key: "user",
      render: (user) => {
        console.log("Rendering user:", user);
        return <span>{user || "N/A"}</span>;
      },
    },
    {
      title: "Sản phẩm",
      dataIndex: "orderItems",
      key: "orderItems",
      render: (items) => (
        <ul>
          {items.map((item) => (
            <li key={item.product}>
              {item.name} x {item.quantity}
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (text) => <span>{text.toLocaleString()} $</span>,
    },
    {
      title: "Phương thức thanh toán",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Giao Hàng",
      dataIndex: "isDelivered",
      key: "isDelivered",
      render: (isDelivered) => (
        <Tag color={isDelivered ? "green" : "volcano"}>
          {isDelivered ? "Đã giao" : "Chưa giao"}
        </Tag>
      ),
    },
    {
      title: "Tình trạng",
      key: "status",
      render: (text, record) => {
        let isPaid = record.isPaid;
        if (record.paymentMethod === "COD" && record.isDelivered) {
          isPaid = true;
        }

        return (
          <Tag color={isPaid ? "green" : "volcano"}>
            {isPaid ? "Đã thanh toán" : "Chưa thanh toán"}
          </Tag>
        );
      },
    },

    {
      title: "Hành động",
      key: "action",
      render: (text, record) => (
        <div>
          <ActionButton
            type="primary"
            style={{ marginRight: 8, marginBottom: 8 }}
            onClick={() => showOrderDetails(record)}
          >
            Chi tiết
          </ActionButton>
          <ActionButton
          type="primary"
            style={{ marginRight: 8, marginBottom: 8 }}
            disabled={record.isDelivered} // Disable nút nếu đã giao
            onClick={() => handleUpdateDeliveryStatus(record._id, true)}
          >
            {record.isDelivered ? "Hoàn thành" : "Xác nhận giao hàng"}
          </ActionButton>
        </div>
      ),
    },
  ];

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(orders?.data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");
    XLSX.writeFile(workbook, "orders_data.xlsx");
  };
  console.log("name", orders.name);
  return (
    <OrderContainer>
      <WrapperHeader>QUẢN LÍ ĐƠN HÀNG</WrapperHeader>
      <div>
        <Button
          type="primary"
          onClick={exportToExcel}
          style={{
            color: "white",
            backgroundColor: "#f95230",
            marginBottom: "10px",
          }}
        >
          Export to Excel
        </Button>
      </div>
      <StyledTable
        columns={columns}
        dataSource={orders}
        rowKey="_id"
        loading={loading}
        pagination={{ pageSize: 5 }} // Hiển thị 5 đơn hàng mỗi trang
      />

      {/* Modal hiển thị chi tiết đơn hàng */}
      <Modal
        title="Chi tiết đơn hàng"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={800}
      >
        {selectedOrder && (
          <>
            <p>
              <strong>Mã đơn hàng:</strong> {selectedOrder._id}
            </p>
            <p>
              <strong>Người dùng:</strong> {selectedOrder.user || "N/A"}
            </p>
            <p>
              <strong>Email:</strong> {selectedOrder.user?.email || "N/A"}
            </p>
            <p>
              <strong>Địa chỉ giao hàng:</strong>{" "}
              {selectedOrder.shippingAddress?.address}
            </p>
            <p>
              <strong>Số điện thoại:</strong>{" "}
              {selectedOrder.shippingAddress?.phone}
            </p>
            <p>
              <strong>Phương thức thanh toán:</strong>{" "}
              {selectedOrder.paymentMethod}
            </p>
            <p>
              <strong>Trạng thái thanh toán:</strong>{" "}
              {selectedOrder.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}
            </p>
            <p>
              <strong>Trạng thái giao hàng:</strong>{" "}
              {selectedOrder.isDelivered ? "Đã giao" : "Chưa giao"}
            </p>
            <h3>Sản phẩm:</h3>
            <ul>
              {selectedOrder.orderItems.map((item) => (
                <li key={item.product}>
                  {item.name} x {item.quantity} - {item.price.toLocaleString()}{" "}
                  $
                </li>
              ))}
            </ul>
            <p>
              <strong>Tổng tiền:</strong>{" "}
              {selectedOrder.totalPrice.toLocaleString()} $
            </p>
          </>
        )}
      </Modal>
    </OrderContainer>
  );
};

export default AdminOrderPage;
