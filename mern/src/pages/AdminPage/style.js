import styled from "styled-components";
import { Menu } from "antd";

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
