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
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 32px;

  @media (max-width: 768px) {
    font-size: 24px;
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
    padding: 15px;
  }
`;

// Columns
export const CartItemsCol = styled(Col)`
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const SummaryCol = styled(Col)`
  padding-left: 20px;

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
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
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
`;

// Item Name
export const ItemName = styled.h3`
  font-size: 16px;
  margin-bottom: 5px;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

// Item Price
export const ItemPrice = styled.p`
  color: #f95230;
  font-weight: bold;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 14px;
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
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;

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
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;

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
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

// Total Price
export const TotalPrice = styled(SummaryItem)`
  font-weight: bold;
  font-size: 18px;
  color: #f95230;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

// Place Order Button
export const PlaceOrderButton = styled(Button)`
  width: 100%;
  background-color: #f95230;
  color: #ffffff;
  font-size: 16px;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
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
