// src/pages/AdminPage/style.js

import styled from "styled-components";
import { Menu } from "antd";
import { Form, Input, Button, Modal, Upload, Select, InputNumber } from "antd";

// Container chính cho trang Admin
export const AdminPageContainer = styled.div`
  display: flex;
  padding: 20px;
  background-color: #f5f5f5; // Màu nền nhẹ để làm nổi bật nội dung quản lý
`;

// Menu Styled Component
export const StyledMenu = styled(Menu)`
  width: 256px;
  height: 100vh;
  background: #fff !important;
  box-shadow: 1px 1px 2px #fa4f31 !important;
  top: 0;
  left: 0;
  z-index: 100;
  color: #f95230;

  .ant-menu-item-selected {
    background-color: #ffe8e1 !important; // Nền nhẹ hơn cho mục được chọn
    font-weight: bold !important;
    color: #fa4f31 !important;
  }

  .ant-menu-item {
    &:hover {
      background-color: #ffe8e1 !important;
    }
  }
`;

// Wrapper cho nội dung của trang Admin
export const AdminContent = styled.div`
  flex: 1;
  padding: 20px;
  margin-left: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

// Wrapper cho Dashboard
export const DashboardWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

// Container cho các thống kê
export const StatsContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 40px;
  flex-wrap: wrap;
`;

// Thẻ thống kê
export const StatCard = styled.div`
  flex: 1;
  min-width: 200px;
  background: #fafafa;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  h3 {
    margin-bottom: 10px;
    color: #333;
  }

  p {
    font-size: 24px;
    font-weight: bold;
    color: #f95230;
  }
`;

// Container cho danh sách đơn hàng mới
export const OrdersContainer = styled.div`
  margin-top: 20px;
`;

// Danh sách đơn hàng
export const OrderList = styled.ul`
  list-style: none;
  padding: 0;
`;

// Mỗi đơn hàng
export const OrderItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 15px 10px;
  border-bottom: 1px solid #ddd;

  &:last-child {
    border-bottom: none;
  }

  .order-id {
    font-weight: bold;
    color: #333;
  }

  .order-date {
    color: #777;
  }
`;
export const ProductHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const ImportButton = styled(Button)`
  margin-left: 10px;
`;

export const ProductTableContainer = styled.div`
  margin-top: 20px;
`;