import styled from "styled-components";

// Container chính của giao diện
export const SuccessContainer = styled.div`
  padding: 40px 20px;
  max-width: 800px;
  margin: 20px auto;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;

  @media (max-width: 768px) {
    padding: 20px 10px;
  }
`;

// Tiêu đề thông báo
export const SuccessHeader = styled.h1`
  font-size: 28px;
  color: #333;
  margin: 20px 0;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

// Nội dung giao diện
export const SuccessContent = styled.div`
  padding: 20px;

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

// Thông tin đơn hàng
export const OrderInfo = styled.div`
  margin-bottom: 20px;
  text-align: left;

  p {
    font-size: 16px;
    margin: 5px 0;

    strong {
      color: #333;
    }

    @media (max-width: 768px) {
      font-size: 14px;
    }
  }
`;

// Thông tin khách hàng
export const UserInfo = styled.div`
  margin-bottom: 20px;
  text-align: left;

  p {
    font-size: 16px;
    margin: 5px 0;
    
    strong {
      color: #f95230;
    }

    @media (max-width: 768px) {
      font-size: 14px;
    }
  }
`;

// Phần chi tiết sản phẩm
export const SuccessDetails = styled.div`
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  margin: 20px 0;
  padding: 20px 0;

  @media (max-width: 768px) {
    padding: 15px 0;
  }
`;

// Hàng sản phẩm
export const ProductRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  flex-wrap: wrap;

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 20px;
  }
`;

// Chi tiết sản phẩm (tên, số lượng)
export const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  span {
    font-size: 16px;

    @media (max-width: 768px) {
      font-size: 14px;
    }
  }
`;

// Giá sản phẩm
export const ProductPrice = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: #f95230;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

// Phần tổng tiền
export const TotalSection = styled.div`
  margin-top: 20px;
  text-align: left;
`;

// Hàng tổng tiền
export const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${(props) => (props.bold ? "18px" : "16px")};
  font-weight: ${(props) => (props.bold ? "bold" : "normal")};
  margin-bottom: 15px;

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    font-size: ${(props) => (props.bold ? "16px" : "14px")};
    gap: 5px;
  }
`;
