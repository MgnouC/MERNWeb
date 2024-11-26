import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  PaymentContainer,
  WrapperHeader,
  PaymentContent,
  CartItemsCol,
  SummaryCol,
  CartItem,
  ItemImage,
  ItemDetails,
  ItemName,
  ItemPrice,
  QuantityText,
  AddressSection,
  AddressHeader,
  AddressForm,
  PaymentSection,
  PaymentHeader,
  PaymentMethodSelect,
  SummaryCard,
  SummaryItem,
  TotalPrice,
  PlaceOrderButton,
} from "./style";
import { message, Input, Select, Button, Modal, Form } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import * as OrderService from "../../services/OrderService";
import { resetOrderState } from "../../redux/slides/orderSlice";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const { Option } = Select;

const PaymentPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux selectors
  const orderItems = useSelector((state) => state.order.orderItems);
  const shippingAddress = useSelector((state) => state.order.shippingAddress);
  const user = useSelector((state) => state.user);
  const [localShippingAddress, setLocalShippingAddress] =
    useState(shippingAddress);
  const [paymentMethod, setPaymentMethod] = useState("paypal");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  // Tổng số lượng và tổng tiền
  const totalQuantity = orderItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const subtotal = orderItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingFee = 30; // Phí vận chuyển cố định
  const discount = 5; // Khuyến mãi cố định

  // Tính tổng tiền đơn hàng
  const totalAmount = subtotal + shippingFee - discount;

  const handlePlaceOrder = async (details = {}) => {
    console.log("Details in handlePlaceOrder:", details);
  
    const fullShippingAddress = {
      name: localShippingAddress?.name || user?.name,
      address: localShippingAddress?.address || user.address,
      phone: localShippingAddress?.phone || user.phone,
    };
  
    const isPayPal = paymentMethod === "paypal";
  
    // Access the capture status
    const captureStatus = details?.purchase_units?.[0]?.payments?.captures?.[0]?.status;
    const isPaymentSuccessful = isPayPal && captureStatus === "COMPLETED";
  
    const orderData = {
      orderItems: orderItems.map((item) => ({
        product: item.id || item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      shippingAddress: fullShippingAddress,
      paymentMethod,
      itemPrice: subtotal,
      shippingPrice: shippingFee,
      taxPrice: discount,
      totalPrice: totalAmount,
      user: user.id,
      isPaid: isPaymentSuccessful,
      paidAt: isPaymentSuccessful ? new Date() : null,
      paymentResult: isPaymentSuccessful
        ? {
            id: details.id,
            status: captureStatus,
            update_time: details.update_time,
            email_address: details.payer?.email_address || "",
          }
        : null,
    };
  
    try {
      const response = await OrderService.createOrder(orderData);
      const createdOrder = response.data; // Giả sử API trả về đơn hàng đã tạo trong response.data
      message.success("Đặt hàng thành công!");
      dispatch(resetOrderState());
  
      // Điều hướng tới OrderSuccessPage với dữ liệu đơn hàng
      navigate("/orderSuccess/", { state: { orderData: createdOrder } });    } catch (error) {
      console.error("Order failed:", error);
      message.error(
        error.response?.data?.message || "Đặt hàng thất bại. Vui lòng thử lại!"
      );
    }
  };
  

  const handleEditAddress = () => {
    setIsModalOpen(true);
    form.setFieldsValue(localShippingAddress);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values) => {
    setLocalShippingAddress(values);
    message.success("Cập nhật địa chỉ giao hàng thành công!");
    setIsModalOpen(false);
  };

  if (orderItems.length === 0) {
    return (
      <PaymentContainer>
        <WrapperHeader>Giỏ hàng của bạn trống!</WrapperHeader>
        <Button type="primary" onClick={() => navigate("/")}>
          Quay lại mua sắm
        </Button>
      </PaymentContainer>
    );
  }

  return (
    <PayPalScriptProvider
      options={{
        "client-id":
          "AYBVzDMSOAr8W7yaB72D22Q_iJA06OZXhVQbseYRJs9t4DvL3I7hocjvT7BPoVrqCt9o-zB28aV-mv-9",
      }}
    >
      <PaymentContainer>
        <WrapperHeader>Thanh Toán</WrapperHeader>

        {/* Địa chỉ giao hàng */}
        <PaymentContent>
          <AddressSection>
            <AddressHeader>
              <span style={{ color: "#fa4f31" }}>📍 Địa Chỉ Nhận Hàng</span>
            </AddressHeader>
            <AddressForm>
              <div
                style={{
                  marginLeft: "28px",
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  gap: "20px",
                }}
              >
                <span style={{ fontSize: 16, fontWeight: 700 }}>
                  {localShippingAddress.name || user.name} (+84){" "}
                  {localShippingAddress.phone || user.phone}
                </span>
                <span style={{ fontSize: 16, fontWeight: 700 }}>
                  {localShippingAddress?.address || user.address}
                </span>
                <Button
                  type="default"
                  style={{
                    marginLeft: "auto",
                    border: "1px solid red",
                    color: "red",
                  }}
                >
                  Mặc Định
                </Button>
                <Button type="link" onClick={handleEditAddress}>
                  Thay Đổi
                </Button>
              </div>
            </AddressForm>
          </AddressSection>
        </PaymentContent>

        {/* Danh sách sản phẩm */}
        <PaymentContent>
          <CartItemsCol xs={24} md={16}>
            <h3 style={{ marginLeft: "28px", color: "#fa4f31" }}>Sản Phẩm</h3>
            {orderItems.map((item) => (
              <CartItem key={item.id || item._id}>
                <ItemImage
                  src={`http://localhost:3000/uploads/${item.image}`}
                  alt={item.name}
                />
                <ItemDetails>
                  <ItemName>{item.name}</ItemName>
                  <ItemPrice>{item.price.toLocaleString()} $</ItemPrice>
                  Số lượng: {item.quantity}
                </ItemDetails>
              </CartItem>
            ))}
          </CartItemsCol>

          {/* Thông tin thanh toán và tổng tiền */}
          <SummaryCol xs={24} md={8}>
            <PaymentSection>
              <PaymentHeader>Phương thức thanh toán</PaymentHeader>
              <PaymentMethodSelect
                value={paymentMethod}
                onChange={(value) => setPaymentMethod(value)}
              >
                <Option value="paypal">PayPal</Option>
                <Option value="COD">Thanh toán khi nhận hàng</Option>
              </PaymentMethodSelect>
            </PaymentSection>

            <SummaryCard>
              <SummaryItem>
                <span>Tổng số lượng</span>
                <span>{totalQuantity} sản phẩm</span>
              </SummaryItem>
              <SummaryItem>
                <span>Tổng tiền hàng</span>
                <span>{subtotal.toLocaleString()} $</span>
              </SummaryItem>
              <SummaryItem>
                <span>Phí vận chuyển</span>
                <span>{shippingFee.toLocaleString()} $</span>
              </SummaryItem>
              <SummaryItem>
                <span>Khuyến mãi</span>
                <span>-{discount.toLocaleString()} $</span>
              </SummaryItem>
              <TotalPrice>
                <span>Tổng cộng</span>
                <span>{totalAmount.toLocaleString()} $</span>
              </TotalPrice>

              {/* Nút PayPal */}
              {paymentMethod === "paypal" && (
                <PayPalButtons
                  style={{ layout: "vertical" }}
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            value: totalAmount.toFixed(2),
                          },
                        },
                      ],
                    });
                  }}
                  onApprove={(data, actions) => {
                    return actions.order.capture().then((details) => {
                      handlePlaceOrder(details);
                    });
                  }}
                  onError={(err) => {
                    console.error("PayPal Checkout onError", err);
                    message.error(
                      "Có lỗi xảy ra khi thanh toán. Vui lòng thử lại!"
                    );
                  }}
                />
              )}

              {/* Nút đặt hàng cho phương thức thanh toán khác */}
              {paymentMethod !== "paypal" && (
                <PlaceOrderButton
                  icon={<ShoppingCartOutlined />}
                  onClick={() => {
                    // Gọi handlePlaceOrder mà không truyền details
                    handlePlaceOrder();
                  }}
                >
                  Đặt Hàng Ngay
                </PlaceOrderButton>
              )}
            </SummaryCard>
          </SummaryCol>
        </PaymentContent>

        {/* Modal thay đổi địa chỉ giao hàng */}
        <Modal
          title="Cập Nhật Địa Chỉ Giao Hàng"
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
        >
          <Form
            form={form}
            name="shippingAddressForm"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label="Họ và Tên"
              name="name"
              rules={[{ required: false, message: "Vui lòng nhập họ và tên!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Địa chỉ"
              name="address"
              rules={[{ required: false, message: "Vui lòng nhập địa chỉ!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Số điện thoại"
              name="phone"
              rules={[
                { required: false, message: "Vui lòng nhập số điện thoại!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Cập Nhật
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </PaymentContainer>
    </PayPalScriptProvider>
  );
};

export default PaymentPage;
