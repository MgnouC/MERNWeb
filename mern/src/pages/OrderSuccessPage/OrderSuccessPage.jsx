import React from "react";
import { useLocation } from "react-router-dom";
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

const OrderSuccessPage = () => {
  const location = useLocation();
  const { orderData } = location.state || {};

  // Kiểm tra xem orderData có tồn tại không
  if (!orderData) {
    return (
      <SuccessContainer>
        <SuccessHeader>Không tìm thấy thông tin đơn hàng</SuccessHeader>
      </SuccessContainer>
    );
  }

  // Lấy orderId từ paymentResult.id hoặc _id
  const orderId =
    orderData.paymentResult?.id || orderData._id || "Không có mã đơn hàng";

  const totalQuantity = orderData.orderItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );
  const totalAmount =
    orderData.itemPrice + orderData.shippingPrice - orderData.taxPrice;

  return (
    <SuccessContainer>
      <CheckCircleOutlined style={{ fontSize: "64px", color: "#52c41a" }} />
      <SuccessHeader>Đặt Hàng Thành Công</SuccessHeader>

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
            {orderData.paymentMethod === "paypal"
              ? "PayPal"
              : "Thanh Toán Khi Nhận Hàng"}
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
            {orderData.shippingAddress.phone || "Số điện thoại chưa được cung cấp"}
          </p>
          <p>
            <strong>Địa chỉ:</strong>{" "}
            {orderData.shippingAddress.address || "Địa chỉ chưa được cung cấp"}
          </p>
        </UserInfo>

        {/* Danh sách sản phẩm */}
        <SuccessDetails>
          {orderData.orderItems.map((item) => (
            <ProductRow key={item.product}>
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
            <span>{orderData.itemPrice.toLocaleString()} $</span>
          </TotalRow>
          <TotalRow>
            <span>Phí vận chuyển:</span>
            <span>{orderData.shippingPrice.toLocaleString()} $</span>
          </TotalRow>
          <TotalRow>
            <span>Khuyến mãi:</span>
            <span>-{orderData.taxPrice.toLocaleString()} $</span>
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
