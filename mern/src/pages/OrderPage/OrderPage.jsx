// Import cần thiết
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge, Button, Input, Select } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import {
  OrderContainer,
  OrderHeader,
  OrderContent,
  CartItemsCol,
  SummaryCol,
  CartItem,
  ItemImage,
  ItemDetails,
  ItemName,
  ItemPrice,
  QuantityInput,
  AddressSection,
  AddressHeader,
  AddressForm,
  PaymentSection,
  PaymentHeader,
  SummaryCard,
  SummaryItem,
  TotalPrice,
  PlaceOrderButton,
  WrapperHeader,
  ItemActions,
  ItemPriceText,
} from "./style";
import * as message from "../../components/Message/Mesage";
import { updateOrderProductQuantity } from "../../redux/slides/orderSlice";
import { DeleteOutlined } from "@ant-design/icons";
import { removeOrderProduct } from "../../redux/slides/orderSlice";

const { Option } = Select;

const OrderPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [users, setUser] = useState([]);

  const user = useSelector((state) => state.user);
  // Lấy orderItems từ Redux store
  const orderItems = useSelector((state) => state.order.orderItems);

  // Tính tổng số lượng sản phẩm
  const totalQuantity = orderItems.reduce(
    (total, item) => total + item?.quantity,
    0
  );

  const handleQuantityChange = (id, value) => {
    dispatch(updateOrderProductQuantity({ id, quantity: value }));
  };

  const handlePlaceOrder = () => {
    const orderData = {
      // Các thông tin đơn hàng khác
      shippingAddress: user.address,
      paymentMethod: paymentMethod,
      // ...
    };

    // Gửi orderData đến server hoặc xử lý tiếp theo
    // Ví dụ:
    //dispatch(createOrder(orderData));
    message.success("Đặt hàng thành công!", orderData);
  };

  const handleRemoveProduct = (productId) => {
    dispatch(removeOrderProduct(productId));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      address: {
        ...prevUser.address,
        [name]: value,
      },
    }));
  };

  return (
    <OrderContainer>
      <WrapperHeader>
        <div>Đặt Hàng</div>
      </WrapperHeader>

      <OrderContent gutter={[20, 20]}>
        <CartItemsCol xs={24} md={16}>
          {orderItems.map((item) => (
            <CartItem key={item.id}>
              <ItemImage
                src={`http://localhost:3000/uploads/${item.image}`}
                alt={item.name}
              />
              <ItemDetails>
                <ItemName>{item.name}</ItemName>
                <ItemActions>
                  <ItemPrice>
                    <ItemPriceText>{item.price}</ItemPriceText>
                  </ItemPrice>
                  <QuantityInput
                    min={1}
                    max={item?.countInStock}
                    value={item.quantity} // Sử dụng giá trị từ Redux store
                    onChange={(value) => handleQuantityChange(item.id, value)} // Gọi hàm cập nhật số lượng
                  />
                </ItemActions>{" "}
                <DeleteOutlined
                  style={{
                    color: "red",
                    fontSize: "18px",
                    cursor: "pointer",
                    marginLeft: "10px",
                  }}
                  onClick={() => handleRemoveProduct(item.id)}
                />
              </ItemDetails>
            </CartItem>
          ))}
        </CartItemsCol>
        <SummaryCol xs={24} md={8}>
          <SummaryCard>
            <SummaryItem>
              <span>Tổng số lượng</span>
              <span>{totalQuantity} sản phẩm</span>
            </SummaryItem>
            <SummaryItem>
              <span>Tổng tiền hàng</span>
              <span>
                {orderItems
                  .reduce((acc, item) => acc + item?.price * item?.quantity, 0)
                  .toLocaleString()}{" "}
                $
              </span>
            </SummaryItem>
            <SummaryItem>
              <span>Phí vận chuyển</span>
              <span>30 $</span>
            </SummaryItem>
            <SummaryItem>
              <span>Khuyến mãi</span>
              <span>-5 $</span>
            </SummaryItem>
            <TotalPrice>
              <span>Tổng cộng</span>
              <span>
                {(
                  orderItems.reduce(
                    (acc, item) => acc + item.price * item.quantity,
                    0
                  ) +
                  30 -
                  5
                ).toLocaleString()}{" "}
                $
              </span>
            </TotalPrice>
            <PlaceOrderButton
              icon={<ShoppingCartOutlined />}
              onClick={handlePlaceOrder}
            >
              Đặt Hàng Ngay
            </PlaceOrderButton>
          </SummaryCard>
        </SummaryCol>
      </OrderContent>

      <AddressSection>
        <AddressForm>
          <AddressSection>
            <AddressHeader>Địa chỉ giao hàng</AddressHeader>
            <AddressForm>
              <Input
                placeholder="Họ và tên"
                name="fullName"
                value={user.name}
                onChange={handleAddressChange}
              />
              <Input
                placeholder="Địa chỉ"
                name="addressLine"
                value={user.address}
                onChange={handleAddressChange}
              />
              <Input
                placeholder="Số điện thoại"
                name="phone"
                value={user.phone}
                onChange={handleAddressChange}
              />
            </AddressForm>
          </AddressSection>
        </AddressForm>
      </AddressSection>

      <PaymentSection>
        <PaymentHeader>Phương thức thanh toán</PaymentHeader>
        <AddressForm>
          <Select
            defaultValue="credit_card"
            style={{ width: "100%" }}
            onChange={(value) => setPaymentMethod(value)}
          >
            <Option value="credit_card">Thẻ tín dụng</Option>
            <Option value="bank_transfer">Chuyển khoản ngân hàng</Option>
            <Option value="paypal">PayPal</Option>
          </Select>
        </AddressForm>
      </PaymentSection>
    </OrderContainer>
  );
};

export default OrderPage;
