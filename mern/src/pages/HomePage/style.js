import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

/* Wrapper for Product Types */
export const WrapperTypeProduct = styled.div`
  background-color: #f95230;
  padding: 10px 120px;
  font-size: 20px;
  display: flex;
  align-items: center;
  gap: 24px;
  justify-content: flex-start;
  height: 60px;
  color: #fff;

  /* Hiệu ứng hover cho các loại sản phẩm */
  & > *:hover {
    color: #ffe6e1;
    cursor: pointer;
    transition: color 0.3s ease;
  }

  /* Responsive Adjustments */
  @media (max-width: 1200px) {
    padding: 10px 80px;
    gap: 20px;
    font-size: 18px;
  }

  @media (max-width: 992px) {
    padding: 10px 60px;
    gap: 16px;
    font-size: 16px;
  }

  @media (max-width: 768px) {
    padding: 8px 40px;
    gap: 12px;
    font-size: 14px;
    height: 50px;
  }

  @media (max-width: 576px) {
    padding: 8px 20px;
    gap: 8px;
    font-size: 12px;
    height: auto;
    flex-wrap: wrap;
  }

  @media (max-width: 480px) {
    padding: 8px 15px;
    gap: 6px;
    font-size: 10px;
  }
`;

/* Styled Button for "More" Action */
export const WrapperButtonMore = styled(ButtonComponent)`
  border-radius: 20px;
  width: 240px;
  padding: 12px 16px;
  font-size: 16px;
  border: 2px solid #f95230;
  color: #f95230;
  background-color: #fff;
  transition: all 0.3s ease;

  &:hover {
    color: #fff;
    background-color: #f95230;
    border-color: #f95230;

    /* Đảm bảo span bên trong cũng thay đổi màu */
    span {
      color: #fff;
    }
  }

  /* Responsive Adjustments */
  @media (max-width: 1200px) {
    padding: 10px 14px;
    font-size: 15px;
    width: 220px;
  }

  @media (max-width: 992px) {
    padding: 8px 12px;
    font-size: 14px;
    width: 200px;
  }

  @media (max-width: 768px) {
    padding: 6px 10px;
    font-size: 13px;
    width: 180px;
  }

  @media (max-width: 576px) {
    padding: 4px 8px;
    font-size: 12px;
    border-radius: 16px;
    width: 160px;
  }

  @media (max-width: 480px) {
    padding: 3px 6px;
    font-size: 11px;
    border-radius: 14px;
    width: 140px;
  }
`;

/* Wrapper for Products List */
export const WrapperProducts = styled.div`
  margin-top: 30px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;

  /* Hiệu ứng hover cho thẻ sản phẩm */
  & > * {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  & > *:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }

  /* Responsive Adjustments */
  @media (max-width: 1200px) {
    gap: 18px;
  }

  @media (max-width: 992px) {
    gap: 16px;
  }

  @media (max-width: 768px) {
    gap: 14px;
  }

  @media (max-width: 576px) {
    gap: 12px;
    justify-content: center; /* Canh giữa các sản phẩm trên màn hình nhỏ */
  }

  @media (max-width: 480px) {
    gap: 10px;
    flex-direction: column;
    align-items: center;
  }
`;
