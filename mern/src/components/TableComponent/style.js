import styled from "styled-components";
import { Table, Button, Input } from "antd";

// Wrapper cho toàn bộ Container
export const TableContainer = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  padding: 20px;
  max-width: 100%;
  margin: 20px auto;

  @media screen and (max-width: 768px) {
    padding: 15px;
  }
`;

// Styled Table
export const StyledTable = styled(Table)`
  background-color: #f8f8f8;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  .ant-table-thead > tr > th {
    background-color: #fafafa !important;
    font-weight: bold !important;
    color: #333;
    text-align: center;
    font-size: 16px;
    border-bottom: 2px solid #f95230;
  }

  .ant-table-tbody > tr:hover {
    background-color: #fff5f5;
  }

  .ant-table-tbody > tr > td {
    padding: 10px 12px;
    vertical-align: middle;
    text-align: center;
  }

  @media (max-width: 768px) {
    .ant-table-thead > tr > th,
    .ant-table-tbody > tr > td {
      font-size: 14px;
      padding: 8px 10px;
    }
  }

  @media (max-width: 576px) {
    .ant-table-thead > tr > th,
    .ant-table-tbody > tr > td {
      font-size: 12px;
      padding: 6px 8px;
    }
  }
`;

// Button chỉnh sửa và xóa
export const StyledButton = styled(Button)`
  width: 80px; /* Đảm bảo chiều dài đồng nhất */
  text-align: center;
  border: 1px solid #d9d9d9;
  color: #333;
  font-weight: bold;
  border-radius: 5px;
  padding: 6px 0;
  margin-right: 10px;
  transition: all 0.3s ease;

  &:hover {
    border: 1px solid #f95230 !important;
    color: #f95230 !important;
    background-color: #fff;
  }
`;

// Nút Export to Excel
export const ExportButton = styled(Button)`
  color: white;
  background-color: #f95230 ;
  margin-bottom: 5px;
  border: none;
  font-weight: bold;

  &:hover {
    background-color: #d43d1a;
    color: #f95230 !important;
  }
`;

// Pagination Style
export const StyledPagination = styled.div`
  .ant-pagination-item a {
    background: #f95230;
    border-radius: 10px;
    border: none !important;
    color: #ffffff;
    transition: background-color 0.3s ease, color 0.3s ease;
    
  }

  .ant-pagination-item-active a {
    background-color: #d43d1a;
    color: #ffffff;
  }

  .ant-pagination-item:hover a {
    background-color: #fa4f31;
    color: #ffffff;
  }

  .ant-pagination-item {
    margin: 0 5px;
  }

  display: flex;
  justify-content: center;
  margin-top: 15px;
`;

// Input cho Filter
export const StyledInput = styled(Input)`
  margin-bottom: 8px;
  display: block;
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #d9d9d9;

  &:focus {
    border-color: #f95230;
    box-shadow: none;
  }
`;

