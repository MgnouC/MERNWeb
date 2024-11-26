import styled from "styled-components";
import { Row, Col, Card, Select, Button, Input } from "antd";

export const PaymentContainer = styled.div`
  padding: 40px 20px;
  background-color: #fafafa;
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 20px 10px;
  }
`;

export const WrapperHeader = styled.h1`
  text-align: center;
  color: #f95230;
  font-size: 32px;
  margin-bottom: 30px;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

export const PaymentContent = styled(Row)`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 15px;
  }
`;

export const CartItemsCol = styled(Col)`
  flex: 1 1 60%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const SummaryCol = styled(Col)`
  flex: 1 1 35%;
  padding-left: 20px;

  @media (max-width: 768px) {
    padding-left: 0;
    margin-top: 20px;
  }
`;

export const CartItem = styled(Card)`
  margin-bottom: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;

  .ant-card-body {
    display: flex;
    align-items: center;
    padding: 10px;
  }

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 20px;

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 10px;
    width: 60px;
    height: 60px;
  }
`;

export const ItemDetails = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ItemName = styled.h3`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const ItemPrice = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #f95230;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const AddressSection = styled.div`
  margin-bottom: 20px;
`;

export const AddressHeader = styled.h2`
  font-size: 18px;
  font-weight: bold;
  color: #f95230;
  margin-bottom: 15px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export const AddressForm = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

export const PaymentSection = styled.div`
  margin-bottom: 20px;
`;

export const PaymentHeader = styled.h2`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
`;

export const PaymentMethodSelect = styled(Select)`
  width: 100%;
  border-radius: 8px;

  &.ant-select-selector {
    border: 1px solid #e0e0e0;
  }
`;

export const SummaryCard = styled(Card)`
  border: none;
  box-shadow: none;

  .ant-card-body {
    padding: 0;
  }
`;

export const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 16px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const TotalPrice = styled(SummaryItem)`
  font-weight: bold;
  font-size: 18px;
  color: #f95230;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export const PlaceOrderButton = styled(Button)`
  width: 100%;
  background-color: #f95230;
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
  border-radius: 8px;

  &:hover {
    background-color: #d43d1a;
    color:  #f95230 !important;
    border: none; 
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;
