import styled from "styled-components";
import { Button, Table, Tag } from "antd";

// Container chính của giao diện
export const OrderContainer = styled.div`
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 1200px;
  margin: 0 auto;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

// Tiêu đề của trang
export const WrapperHeader = styled.h2`
  margin-bottom: 20px;
  color: #fa4f31;
  font-weight: bold;
  text-align: center;
  font-size: 36px;

  @media (max-width: 768px) {
    font-size: 24px;
  }

  @media (max-width: 576px) {
    font-size: 20px;
  }
`;

// Table Styled Component
export const StyledTable = styled(Table)`
  .ant-table-thead > tr > th {
    background-color: #f9f9f9;
    font-weight: bold;
    color: #fa4f31;
    text-align: center;
    font-size: 16px;
    border-bottom: 2px solid #fa4f31;
  }

  .ant-table-tbody > tr {
    &:hover {
      background-color: #fff5f5;
    }
  }

  .ant-table-tbody > tr > td {
    padding: 12px 15px;
    vertical-align: middle;
    text-align: center;
  }

  @media (max-width: 768px) {
    .ant-table-thead > tr > th,
    .ant-table-tbody > tr > td {
      font-size: 14px;
      padding: 10px 8px;
    }
  }

  @media (max-width: 576px) {
    .ant-table-thead > tr > th,
    .ant-table-tbody > tr > td {
      font-size: 12px;
      padding: 8px 6px;
    }
  }
`;

// Cancel Button Styled Component
export const CancelOrderButton = styled(Button)`
  background: #fa4f31;
  border: none;
  color: #ffffff;
  font-weight: bold;
  border-radius: 6px;
  padding: 8px 16px;
  transition: all 0.3s ease;

  &:hover {
    background: #ffffff;
    color: #fa4f31;
    border: 1px solid #fa4f31;
  }

  &:focus {
    background: #d43d1a;
    color: #ffffff;
  }

  &:active {
    background: #b12e1c;
    color: #ffffff;
    transform: scale(0.98);
  }
`;

// Styled Tag for Status
export const StatusTag = styled(Tag)`
  padding: 5px 10px;
  border-radius: 12px;
  font-weight: bold;
  text-align: center;

  &.ant-tag-green {
    background-color: rgba(0, 255, 0, 0.1);
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
`;
