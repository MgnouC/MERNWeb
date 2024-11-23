import styled from "styled-components";
import { Table, Button, Modal, Tag } from "antd";

// Container for the Admin Order page
export const OrderContainer = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
`;

// Header of the Admin Order page
export const WrapperHeader = styled.h1`
  padding: 10px;
  color: #f95230 !important;
  font-size: 32px;
  line-height: 40px;
  font-weight: 500;
  text-align: center;
  margin-bottom: 20px;
  margin-top: 20px;
  border-bottom: 1px solid #f95230;
  @media screen and (max-width: 768px) {
    font-size: 24px;
    line-height: 32px;
  }
  font-family: san-serif;
`;

// Styled table for displaying orders
export const StyledTable = styled(Table)`
  background-color: #f8f8f8;
  border-radius: 10px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  .ant-table-thead > tr > th {
    background-color: #fafafa !important;
    font-weight: bold !important;
    color: #333 !important;
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

// Action buttons for updating or viewing orders

export const ActionButton = styled(Button)`
  /* Button Edit Hover State */
  background-color: transparent;
  border-color: #d9d9d9;
  color: rgba(0, 0, 0, 0.88);
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.02);
  font-weight: 62.5%;
  cursor: pointer !important;
  &:hover {
    background-color: rgb(255, 255, 255) !important;
    border: 1px solid #f95230 !important;
    color: #f95230 !important;
    transition: all 0.3s ease;
  }
`;

// Modal for displaying order details
export const OrderDetailsModal = styled(Modal)`
  .ant-modal-header {
    background-color: #f8f8f8;
    border-bottom: 1px solid #e8e8e8;
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
  padding: 5px 10px !important;
  border-radius: 10px !important;
  font-weight: bold !important;
  text-align: center !important;

  &.ant-tag-green {
    background-color: rgba(76, 175, 80, 0.1) !important;
    color: green !important;
  }

  &.ant-tag-volcano {
    background-color: rgba(250, 79, 49, 0.1) !important;
    color: #fa4f31 !important;
  }
`;
