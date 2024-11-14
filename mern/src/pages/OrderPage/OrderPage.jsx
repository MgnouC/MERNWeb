import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge, Button, Input, Select } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import {
  OrderContainer,
  WrapperHeader,
  OrderContent,
  CartItemsCol,
  SummaryCol,
  CartItem,
  ItemImage,
  ItemDetails,
  ItemName,
  ItemPrice,
  QuantityInput,
  SummaryCard,
  SummaryItem,
  TotalPrice,
  PlaceOrderButton,
} from "./style";
import * as message from "../../components/Message/Mesage";
import { updateOrderProductQuantity, removeOrderProduct } from "../../redux/slides/orderSlice";
import { DeleteOutlined } from "@ant-design/icons";

const OrderPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orderItems = useSelector((state) => state.order.orderItems);
  const user = useSelector((state) => state.user);

  // Tính tổng số lượng sản phẩm
  const totalQuantity = orderItems.reduce(
    (total, item) => total + item?.quantity,
    0
  );
  const subtotal = orderItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const totalAmount = orderItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  ) +25; // Tổng tiền + phí vận chuyển - khuyến mãi

  const handleQuantityChange = (id, value) => {
    dispatch(updateOrderProductQuantity({ id, quantity: value }));
  };

  const handleRemoveProduct = (productId) => {
    dispatch(removeOrderProduct(productId));
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
                <ItemPrice>
                  <span>{item.price.toLocaleString()} $</span>
                </ItemPrice>
                <QuantityInput
                  min={1}
                  max={item?.countInStock}
                  value={item.quantity}
                  onChange={(value) => handleQuantityChange(item.id, value)}
                />
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
              <span>{subtotal.toLocaleString()} $</span>
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
              <span>{totalAmount.toLocaleString()} $</span>
            </TotalPrice>
            <PlaceOrderButton
              icon={<ShoppingCartOutlined />}
              onClick={() => navigate("/payment")}            >
              Đặt Hàng Ngay
            </PlaceOrderButton>
          </SummaryCard>
        </SummaryCol>
      </OrderContent>
    </OrderContainer>
  );
};

export default OrderPage;
