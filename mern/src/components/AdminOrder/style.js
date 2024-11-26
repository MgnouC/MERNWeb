import styled from "styled-components";
import { Table, Button, Modal, Tag } from "antd";

// Container for the Admin Order page
export const OrderContainer = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  max-width: 1200px;
  margin: 20px auto;

  @media screen and (max-width: 768px) {
    padding: 15px;
  }
`;

// Header of the Admin Order page
export const WrapperHeader = styled.h1`
  padding: 10px;
  color: #f95230;
  font-size: 32px;
  line-height: 40px;
  font-weight: 500;
  text-align: center;
  margin-bottom: 20px;
  border-bottom: 2px solid #f95230;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;

  @media screen and (max-width: 768px) {
    font-size: 24px;
    line-height: 32px;
  }
`;

// Styled table for displaying orders
export const StyledTable = styled(Table)`
  background-color: #f8f8f8;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  .ant-table-thead > tr > th {
    background-color: #fafafa;
    font-weight: bold;
    color: #333;
    text-align: center;
    font-size: 16px;
    border-bottom: 2px solid #f95230;
  }

  .ant-table-tbody > tr:hover {
    background-color: #fff5f5;
  }

  .ant-table-tbody > tr > td {
    padding: 10px 12px; /* Giảm padding */
    vertical-align: middle;
    text-align: center;
  }

  @media (max-width: 768px) {
    .ant-table-thead > tr > th,
    .ant-table-tbody > tr > td {
      font-size: 14px;
      padding: 8px 10px; /* Giảm padding hơn nữa */
    }
  }

  @media (max-width: 576px) {
    .ant-table-thead > tr > th,
    .ant-table-tbody > tr > td {
      font-size: 12px;
      padding: 6px 8px; /* Giảm padding tối đa */
    }
  }
`;


// Action buttons for updating or viewing orders
export const ActionButton = styled(Button)`
  background-color: transparent;
  border: 1px solid #d9d9d9;
  color: rgba(0, 0, 0, 0.88);
  font-weight: bold;
  border-radius: 6px;
  width: 150px; /* Đặt chiều dài cố định */
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    background-color: #fff !important;
    border-color: #f95230 ;
    color: #f95230 !important;
  }

  &:active {
    background-color: #fae8e4 !important;
    border-color: #d43d1a;
    color: #d43d1a;
  }

  @media screen and (max-width: 768px) {
    width: 100px; /* Giảm chiều dài nút cho màn hình nhỏ */
  }
`;

// Modal for displaying order details
export const OrderDetailsModal = styled(Modal)`
  .ant-modal-header {
    background-color: #f8f8f8;
    border-bottom: 1px solid #e8e8e8;
    padding: 15px;
  }

  .ant-modal-title {
    color: #f95230;
    font-weight: bold;
  }

  .ant-modal-footer {
    border-top: 1px solid #e8e8e8;
  }
`;

// Styled Tag for order status
export const StatusTag = styled(Tag)`
  padding: 6px 12px;
  border-radius: 10px;
  font-weight: bold;
  text-align: center;

  &.ant-tag-green {
    background-color: rgba(76, 175, 80, 0.1);
    color: green;
  }

  &.ant-tag-volcano {
    background-color: rgba(250, 79, 49, 0.1);
    color: #fa4f31;
  }

  &.ant-tag-blue {
    background-color: rgba(30, 144, 255, 0.1);
    color: #1e90ff;
  }

  &:hover {
    transform: scale(1.05);
    transition: transform 0.2s ease;
  }
`;
