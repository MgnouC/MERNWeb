// style.js
import styled from "styled-components";
import { Row, Col, Card, Input, Select, Button } from "antd";

export const PaymentContainer = styled.div`
  padding: 40px 20px;
  background-color: #f5f5f5;
  min-height: 100vh;
`;

export const WrapperHeader = styled.h1`
  text-align: center;
  color: #f95230;
  font-size: 32px;
  margin-bottom: 30px;
`;

export const PaymentContent = styled(Row)`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  margin-Bottom: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const CartItemsCol = styled(Col)`
  flex: 1 1 60%;
  padding-right: 20px;
`;

export const SummaryCol = styled(Col)`
  flex: 1 1 35%;
  padding-left: 20px;
`;

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

export const ItemDetails = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

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
export const ItemPrice = styled.div`
  display: flex;
  align-items: center;
  justify-item: center;
  gap: 4px; // Khoảng cách giữa giá và đơn vị tiền tệ
  color: #f95230;
  font-weight: bold;
  margin-right: 20px;
  font-size: 24px;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const QuantityText = styled.p`
  font-size: 14px;
`;

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
export const AddressSection = styled.div`
  margin-bottom: 20px;
`;

export const AddressHeader = styled.h2`
  font-size: 18px;
  color: "#fa4f31";
  margin-bottom: 15px;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;


export const AddressForm = styled.div`
  display: flex;
  flex-direction: row; /* Sắp xếp các phần tử theo hàng ngang */
  align-items: center; /* Căn giữa theo chiều dọc */
  gap: 20px; /* Khoảng cách giữa các phần tử */
  width: 100%;
`;



export const PaymentSection = styled.div`
  margin-bottom: 20px;
`;

export const PaymentHeader = styled.h2`
  font-size: 18px;
  color: #333;
  margin-bottom: 10px;
`;

export const PaymentMethodSelect = styled(Select)`
  width: 100%;
`;

export const SummaryCard = styled(Card)`
  margin-top: 20px;
  margin-bottom: 20px;
  .ant-card-body {
    padding: 0;
  }
`;

export const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 16px;
`;

export const TotalPrice = styled(SummaryItem)`
  font-weight: bold;
  font-size: 18px;
  color: #f95230;
`;

export const PlaceOrderButton = styled(Button)`
  width: 100%;
  background-color: #f95230;
  color: #ffffff;
  font-size: 16px;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  border: none;

  &:hover{
  color: #f95230 !important;
  },
  &:focus {
    background-color: #d43d1a;
    color: #ffffff;
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;
