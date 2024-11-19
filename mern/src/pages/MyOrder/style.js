import styled from "styled-components";
import { Button, Table, Tag } from "antd";

// Container chính của giao diện
export const OrderContainer = styled.div`
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-width: 1200px;
  margin: 0 auto;
  font-family: san-serif;
`;

// Tiêu đề của trang
export const WrapperHeader = styled.h2`
  margin-bottom: 20px;
  color: #fa4f31 !important;
  font-weight: bold !important;
  text-align: center !important;
  font-size: 36px !important;
  

  @media (max-width: 768px) {
    font-size: 20px !important;
  }
`;

// Table Styled Component
export const StyledTable = styled(Table)`
  .ant-table-thead > tr > th {
    background-color: #f9f9f9 !important;
    font-weight: bold !important;
    color: #fa4f31 !important;
  }

  .ant-table-tbody > tr > td {
    padding: 12px 15px !important;
    vertical-align: middle !important;
  }

  @media (max-width: 768px) {
    .ant-table-thead > tr > th,
    .ant-table-tbody > tr > td {
      font-size: 14px !important;
      padding: 10px 8px !important;
    }
  }

  @media (max-width: 576px) {
    .ant-table-thead > tr > th,
    .ant-table-tbody > tr > td {
      font-size: 12px !important;
      padding: 8px 6px !important;
    }
  }
`;

// Cancel Button Styled Component
export const CancelOrderButton = styled(Button)`
  background: #fa4f31 !important;
  border: none !important;
  color: #fff !important;
  font-weight: bold !important;
  cursor: pointer !important;

  &:hover {
    background: #fff !important;
    color: #fa4f31 !important;
  }

  &:focus {
    background: #d43d1a !important;
    color: #fff !important;
  }
`;

// Styled Tag for Status
export const StatusTag = styled(Tag)`
  padding: 5px 10px !important;
  border-radius: 12px !important;
  font-weight: bold !important;
  text-align: center !important;

  &.ant-tag-green {
    background-color: rgba(0, 255, 0, 0.1) !important;
    color: green !important;
  }

  &.ant-tag-volcano {
    background-color: rgba(250, 79, 49, 0.1) !important;
    color: #fa4f31 !important;
  }
`;
