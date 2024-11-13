// src/pages/OrderPage/style.js
import styled from "styled-components";
import { Row, Col, Button, InputNumber, Card, Select } from "antd";

// Main Container
export const OrderContainer = styled.div`
  padding: 40px 20px;
  background-color: #f5f5f5;
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 20px 10px;
  }
`;

// Header
export const WrapperHeader = styled.h1`
  text-align: center;
  color: #f95230;
  margin-bottom: 30px;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 32px;
  line-height: 1.2;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;

  @media (max-width: 768px) {
    font-size: 24px;
    line-height: 1.3; // Tăng line-height cho màn hình nhỏ hơn
  }
`;


// Content Section
export const OrderContent = styled(Row)`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 10px; // Giảm padding để phù hợp với màn hình nhỏ hơn
  }
`;


// Columns
export const CartItemsCol = styled(Col)`
  flex: 1 1 60%;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const SummaryCol = styled(Col)`
  padding-left: 20px;
  flex: 1 1 35%;
  @media (max-width: 768px) {
    padding-left: 0;
    margin-top: 20px;
  }
`;

// Cart Item Card
export const CartItem = styled(Card)`
  margin-bottom: 20px;
  border: 1px solid #e8e8e8;

  .ant-card-body {
    display: flex;
    align-items: center;
    padding: 10px;
    justify-content: space-between; // Đảm bảo tất cả các thành phần được căn chỉnh đều
    flex-wrap: wrap;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 15px;
  }
`;



// Product Image
export const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 20px;

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 10px;
    width: 60px;
    height: 60px;
  }
`;

// Item Details
export const ItemDetails = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

// Item Name - Để đảm bảo tên không chiếm quá nhiều chỗ
export const ItemName = styled.h3`
  font-size: 16px;
  margin-bottom: 5px;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

// Container cho giá tiền và các hành động
export const ItemActions = styled.div`
  display: flex;
  align-items: center;
  gap: 20px; // Đảm bảo khoảng cách giữa các nút và giá trị số lượng
`;

// Item Price
export const ItemPrice = styled.div`
  display: flex;
  align-items: center;
  gap: 4px; // Khoảng cách giữa giá và đơn vị tiền tệ
  color: #f95230;
  font-weight: bold;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const ItemPriceText = styled.span`
  font-size: 16px;
  &::after {
    content: " $"; // Đảm bảo đơn vị tiền tệ chỉ hiện một lần
  }
`;
// Quantity Input
export const QuantityInput = styled(InputNumber)`
  width: 60px;

  @media (max-width: 768px) {
    width: 50px;
  }
`;

// Address Section
export const AddressSection = styled.div`
  margin-bottom: 30px;
`;

// Address Header
export const AddressHeader = styled.h2`
  font-size: 18px;
  color: #27272a;
  margin-bottom: 15px;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

// Address Form
export const AddressForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

// Payment Section
export const PaymentSection = styled.div`
  margin-bottom: 30px;
`;

// Payment Header
export const PaymentHeader = styled.h2`
  font-size: 18px;
  color: #27272a;
  margin-bottom: 15px;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

// Summary Card
export const SummaryCard = styled(Card)`
  border: none;
  box-shadow: none;

  .ant-card-body {
    padding: 0;
  }
`;

// Summary Item
export const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  font-size: 16px;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const TotalSectionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

// Total Price
export const TotalPrice = styled(SummaryItem)`
  font-weight: bold;
  font-size: 18px;
  color: #f95230;

  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 15px; // Đảm bảo khoảng cách giữa tổng tiền và nút đặt hàng
  }
`;

// Place Order Button
export const PlaceOrderButton = styled(Button)`
  width: 100%;
  background-color: #f95230;
  color: #ffffff;
  font-size: 16px;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  border: none;

  &:hover,
  &:focus {
    background-color: #d43d1a;
    color: #ffffff;
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;
