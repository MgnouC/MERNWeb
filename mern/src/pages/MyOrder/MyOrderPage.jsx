import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { message, Modal } from "antd";
import {
  OrderContainer,
  WrapperHeader,
  StyledTable,
  CancelOrderButton,
  StatusTag,
} from "./style";
import * as OrderService from "../../services/OrderService";
import {
  setLoading,
  setError,
  setUserOrders,
  cancelUserOrder,
} from "../../redux/slides/orderSlice";

const { confirm } = Modal;

const MyOrderPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  // Kiểm tra xem user có tồn tại và có _id không
  const userId = user._id || user.id;
  const orders = useSelector((state) => state.order.userOrders);
  const loading = useSelector((state) => state.order.loading);
  const error = useSelector((state) => state.order.error);

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        dispatch(setLoading(true));
        console.log("User ID:", userId);
        const response = await OrderService.getOrderDetails(userId);
        console.log("Response from API:", response);

        // Kiểm tra cấu trúc response và cập nhật dữ liệu
        if (response.data && response.data.data) {
          dispatch(setUserOrders(response.data.data));
        } else {
          dispatch(setUserOrders([]));
        }

        dispatch(setLoading(false));
      } catch (error) {
        console.error("Error fetching orders:", error);
        dispatch(setError(error.message));
        dispatch(setLoading(false));
        message.error("Lỗi khi tải danh sách đơn hàng");
      }
    };

    if (userId) {
      fetchUserOrders();
    }
  }, [dispatch, userId]);

  const handleCancelOrder = async (orderId) => {
    try {
      await OrderService.cancelOrder(orderId);
      dispatch(cancelUserOrder(orderId));
      message.success("Hủy đơn hàng thành công!");
    } catch (error) {
      message.error("Hủy đơn hàng thất bại. Vui lòng thử lại!");
    }
  };

  const showCancelConfirm = (orderId) => {
    confirm({
      title: "Bạn có chắc muốn hủy đơn hàng không?",
      content: "Hủy đơn hàng này sẽ không thể hoàn tác.",
      okText: "Đồng ý",
      okType: "danger",
      cancelText: "Hủy bỏ",
      onOk() {
        handleCancelOrder(orderId);
      },
      onCancel() {
        //console.log("Hủy bỏ hành động hủy đơn hàng");
      },
    });
  };

  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "_id",
      key: "_id",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Ngày đặt",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => {
        const date = new Date(text);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;
        return <span>{formattedDate}</span>;
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
      render: (isDelivered) =>
        isDelivered ? (
          <StatusTag color="green">Đã giao</StatusTag>
        ) : (
          <StatusTag color="volcano">Chưa giao</StatusTag>
        ),
    },
    {
      title: "Tình trạng",
      key: "status",
      render: (text, record) => {
        let isPaid = record.isPaid;
        // Nếu phương thức thanh toán là COD và đơn hàng đã giao, thì cập nhật isPaid thành true
        if (record.paymentMethod === "COD" && record.isDelivered) {
          isPaid = true;
        }
        else if (record.paymentMethod === "paypal") {
          isPaid = true;
        }
        return isPaid ? (
          <StatusTag color="green">Đã thanh toán</StatusTag>
        ) : (
          <StatusTag color="volcano">Chưa thanh toán</StatusTag>
        );
      },
    },
    {
      title: "Hành động",
      key: "action",
      render: (text, record) =>
        //let isDelivered = record.isDelivered;
        !record.isDelivered &&  (
          <CancelOrderButton onClick={() => showCancelConfirm(record._id)}>
            Hủy đơn hàng
          </CancelOrderButton>
        ),
    },
  ];

  // Kiểm tra xem có lỗi hoặc không có đơn hàng
  if (!loading && (!orders || orders.length === 0)) {
    return (
      <OrderContainer>
        <WrapperHeader>Đơn Hàng Của {user?.name}</WrapperHeader>
        <p>Bạn chưa có đơn hàng nào.</p>
      </OrderContainer>
    );
  }

  return (
    <OrderContainer>
      <WrapperHeader>Đơn hàng của {user?.name}</WrapperHeader>
      <StyledTable
        columns={columns}
        dataSource={orders}
        rowKey="_id"
        loading={loading}
      />
    </OrderContainer>
  );
};

export default MyOrderPage;
