import styled from "styled-components";

export const WrapperHeader = styled.h1`
  padding: 10px;
  color: #f95230;
  font-size: 32px;
  line-height: 1.25;
  font-weight: 500;
  text-align: center;
  margin: 20px 0;
  border-bottom: 1px solid #f95230;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  transition: font-size 0.3s ease, line-height 0.3s ease, margin 0.3s ease,
    color 0.3s ease;

  &:hover {
    color: #d43d1a; // Màu khi hover để tạo điểm nhấn cho người dùng
  }

  @media (max-width: 1200px) {
    font-size: 28px;
    line-height: 1.2;
    margin: 18px 0;
  }

  @media (max-width: 992px) {
    font-size: 24px;
    line-height: 1.1;
    margin: 16px 0;
  }

  @media (max-width: 768px) {
    font-size: 20px;
    line-height: 1;
    margin: 14px 0;
  }

  @media (max-width: 576px) {
    font-size: 18px;
    line-height: 1;
    margin: 12px 0;
  }

  @media (max-width: 480px) {
    font-size: 16px;
    line-height: 1;
    margin: 10px 0;
  }
`;
