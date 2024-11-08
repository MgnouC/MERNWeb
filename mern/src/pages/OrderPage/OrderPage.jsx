// OrderPage.jsx
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
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
} from "./style";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import * as ProductService from "../../services/ProductServices";
import * as message from "../../components/Message/Mesage";
import { Select } from "antd";
import * as UserService from "../../services/UserServices";
import { WrapperHeader } from "./style";

const { Option } = Select;

const OrderPage = () => {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("credit_card");

  // Dummy data for cart items
  const cartItems = [
    {
      id: 1,
      name: "Product 1",
      price: 150000,
      quantity: 2,
      image: "path/to/product1.jpg",
      countInStock: 5,
    },
    {
      id: 2,
      name: "Product 2",
      price: 200000,
      quantity: 1,
      image: "path/to/product2.jpg",
      countInStock: 3,
    },
  ];

  // Fetch user addresses (dummy implementation)
  // const { data: addresses, isLoading: loadingAddresses } = useQuery(
  //   ["addresses"],
  //   () => UserService.getDetailsUser(),
  //   {
  //     onError: (error) => {
  //       message.error(
  //         "Error fetching addresses: " + (error.message || "Unknown error")
  //       );
  //     },
  //   }
  // );

  const handleQuantityChange = (id, value) => {
    // Handle quantity change logic
    // This is a placeholder. You should update the cartItems state accordingly.
    console.log(`Product ID: ${id}, New Quantity: ${value}`);
  };

  const handlePlaceOrder = () => {
    // Handle place order logic
    message.success("Order placed successfully!");
  };

  // if (loadingAddresses) {
  //   return <div>Loading addresses...</div>;
  // }

  return (
    <OrderContainer>
      <WrapperHeader>Đặt Hàng</WrapperHeader>
      <OrderContent gutter={[20, 20]}>
        <CartItemsCol xs={24} md={16}>
          {cartItems.map((item) => (
            <CartItem key={item.id}>
              <ItemImage src={item.image} alt={item.name} />
              <ItemDetails>
                <ItemName>{item.name}</ItemName>
                <ItemPrice>{item.price.toLocaleString()} VND</ItemPrice>
                <QuantityInput
                  min={1}
                  max={item.countInStock}
                  defaultValue={item.quantity}
                  onChange={(value) => handleQuantityChange(item.id, value)}
                />
              </ItemDetails>
            </CartItem>
          ))}
        </CartItemsCol>
        <SummaryCol xs={24} md={8}>
          <SummaryCard>
            <SummaryItem>
              <span>Tổng tiền hàng</span>
              <span>
                {cartItems
                  .reduce((acc, item) => acc + item.price * item.quantity, 0)
                  .toLocaleString()}{" "}
                VND
              </span>
            </SummaryItem>
            <SummaryItem>
              <span>Phí vận chuyển</span>
              <span>30,000 VND</span>
            </SummaryItem>
            <SummaryItem>
              <span>Khuyến mãi</span>
              <span>-20,000 VND</span>
            </SummaryItem>
            <TotalPrice>
              <span>Tổng cộng</span>
              <span>
                {(
                  cartItems.reduce(
                    (acc, item) => acc + item.price * item.quantity,
                    0
                  ) +
                  30000 -
                  20000
                ).toLocaleString()}{" "}
                VND
              </span>
            </TotalPrice>
            <PlaceOrderButton onClick={handlePlaceOrder}>
              Đặt Hàng Ngay
            </PlaceOrderButton>
          </SummaryCard>
        </SummaryCol>
      </OrderContent>

      <AddressSection>
        <AddressHeader>Địa chỉ giao hàng</AddressHeader>
        <AddressForm>
          <Select
            placeholder="Chọn địa chỉ giao hàng"
            style={{ width: "100%" }}
            onChange={(value) => setSelectedAddress(value)}
          >
            {/* {addresses &&
              addresses.map((address) => (
                <Option key={address.id} value={address.id}>
                  {address.street}, {address.city}, {address.country}
                </Option>
              ))} */}
          </Select>
          {/* <ButtonComponent
            textButton="Thêm địa chỉ mới"
            // onClick={() => {
            //   // Handle add new address
            //   message.info("Thêm địa chỉ mới");
            // }}
          /> */}
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
