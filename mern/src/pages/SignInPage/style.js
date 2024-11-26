import styled from "styled-components";

// Container bên trái
export const WrapperContainerLeft = styled.div`
  flex: 1;
  padding: 40px 45px 24px;
  border-radius: 0px 20px 20px 0px;
  background-color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  /* Responsive Adjustments */
  @media (max-width: 1200px) {
    padding: 35px 40px 20px;
  }

  @media (max-width: 992px) {
    padding: 30px 35px 16px;
  }

  @media (max-width: 768px) {
    padding: 25px 30px 12px;
  }

  @media (max-width: 576px) {
    padding: 20px 25px 8px;
    border-radius: 0px 15px 15px 0px;
  }

  @media (max-width: 480px) {
    padding: 15px 20px 5px;
    border-radius: 0px 10px 10px 0px;
  }
`;

// Container bên phải
export const WrapperContainerRight = styled.div`
  width: 300px;
  background: linear-gradient(135deg, #ee4d2d 0%, #ff7337 100%);
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  border-radius: 0px 20px 20px 0px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  /* Responsive Adjustments */
  @media (max-width: 1200px) {
    width: 280px;
  }

  @media (max-width: 992px) {
    width: 250px;
  }

  @media (max-width: 768px) {
    width: 220px;
  }

  @media (max-width: 576px) {
    width: 100%;
    border-radius: 0px 15px 15px 0px;
  }

  @media (max-width: 480px) {
    width: 100%;
    border-radius: 0px 10px 10px 0px;
  }
`;

// Text nhẹ (highlight, link)
export const WrapperTextLight = styled.span`
  color: #ee4d2d;
  font-size: 13px;
  cursor: pointer;
  display: inline-block;
  transition: color 0.3s ease, text-decoration 0.3s ease;

  &:hover {
    color: #ff7337;
    text-decoration: underline;
  }

  /* Responsive Font Sizes */
  @media (max-width: 1200px) {
    font-size: 12px;
  }

  @media (max-width: 992px) {
    font-size: 11px;
  }

  @media (max-width: 768px) {
    font-size: 10px;
  }

  @media (max-width: 576px) {
    font-size: 9px;
  }

  @media (max-width: 480px) {
    font-size: 8px;
  }
`;
