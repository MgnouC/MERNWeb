import React from "react";
import { useSelector } from "react-redux";
import {
  SuccessContainer,
  SuccessHeader,
  SuccessContent,
  SuccessDetails,
  ProductRow,
  ProductDetails,
  ProductPrice,
  TotalSection,
  TotalRow,
  UserInfo,
  OrderInfo,
} from "./style";
import { CheckCircleOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";

const OrderSuccessPage = () => {
  // Lấy thông tin từ Redux store
  const location = useLocation();
  const { orderData } = location.state || {};
  const orderItems = useSelector((state) => state.order.orderItems);
  const shippingAddress = useSelector((state) => state.order.shippingAddress);
  const paymentMethod = useSelector((state) => state.order.paymentMethod);
  const user = useSelector((state) => state.user);
  const totalAmount =
    orderData.orderItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    ) +
    30 -
    5; // Tổng tiền hàng + phí vận chuyển - khuyến mãi
  const orderId = "123456"; // Giả sử bạn có mã đơn hàng từ Redux hoặc server
  const totalQuantity = orderItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  console.log(shippingAddress);
  return (
    <SuccessContainer>
      <CheckCircleOutlined style={{ fontSize: "64px", color: "#52c41a" }} />
      <SuccessHeader>Thanh Toán Thành Công</SuccessHeader>

      <SuccessContent>
        {/* Thông tin đơn hàng */}
        <OrderInfo>
          <p>
            <strong>Mã đơn hàng:</strong> {orderId}
          </p>
          <p>
            <strong>Số lượng sản phẩm:</strong> {totalQuantity}
          </p>
          <p>
            <strong>Phương thức thanh toán:</strong>{" "}
            {paymentMethod === "paypal" ? "PayPal" : "Chuyển khoản Ngân hàng"}
          </p>
        </OrderInfo>

        {/* Thông tin người dùng */}
        <UserInfo>
          <p>
            <strong>Tên khách hàng:</strong>{" "}
            {orderData.shippingAddress.name || "Tên chưa được cung cấp"}
          </p>
          <p>
            <strong>Số điện thoại:</strong>{" "}
            {orderData.shippingAddress.phone ||
              "Số điện thoại chưa được cung cấp"}
          </p>
          <p>
            <strong>Địa chỉ:</strong>{" "}
            {orderData.shippingAddress.address || "Địa chỉ chưa được cung cấp"}
          </p>
        </UserInfo>

        {/* Danh sách sản phẩm */}
        <SuccessDetails>
          {orderData.orderItems.map((item) => (
            <ProductRow key={item.id}>
              <ProductDetails>
                <span>{item.name}</span>
                <span>x{item.quantity}</span>
              </ProductDetails>
              <ProductPrice>
                {(item.price * item.quantity).toLocaleString()} $
              </ProductPrice>
            </ProductRow>
          ))}
        </SuccessDetails>

        {/* Tổng tiền */}
        <TotalSection>
          <TotalRow>
            <span>Tổng tiền hàng:</span>
            <span>
              {orderData.orderItems
                .reduce((acc, item) => acc + item.price * item.quantity, 0)
                .toLocaleString()}{" "}
              $
            </span>
          </TotalRow>
          <TotalRow>
            <span>Phí vận chuyển:</span>
            <span>30 $</span>
          </TotalRow>
          <TotalRow>
            <span>Khuyến mãi:</span>
            <span>-5 $</span>
          </TotalRow>
          <TotalRow bold>
            <span>Tổng cộng:</span>
            <span>{totalAmount.toLocaleString()} $</span>
          </TotalRow>
        </TotalSection>
      </SuccessContent>
    </SuccessContainer>
  );
};

export default OrderSuccessPage;
