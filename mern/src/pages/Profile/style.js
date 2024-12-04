import styled from "styled-components";

// Tiêu đề của Hồ sơ cá nhân
export const WrapperHeaderUser = styled.h1`
  color: #f95230;
  font-size: 24px;
  margin: 4px 0;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  text-align: center;
  transition: font-size 0.3s ease, margin 0.3s ease;

  @media (max-width: 1200px) {
    font-size: 22px;
  }

  @media (max-width: 992px) {
    font-size: 20px;
  }

  @media (max-width: 768px) {
    font-size: 18px;
    margin: 3px 0;
  }

  @media (max-width: 576px) {
    font-size: 16px;
    margin: 2px 0;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    margin: 1px 0;
  }
`;

// Nội dung của Hồ sơ cá nhân
export const WrapperContentProfile = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  width: 700px;
  margin: 20px auto;
  padding: 40px;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  gap: 30px;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 1200px) {
    width: 650px;
    padding: 35px;
    gap: 25px;
  }

  @media (max-width: 992px) {
    width: 600px;
    padding: 30px;
    gap: 20px;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 25px;
    gap: 15px;
  }

  @media (max-width: 576px) {
    padding: 20px;
    gap: 10px;
  }

  @media (max-width: 480px) {
    padding: 15px;
    gap: 8px;
  }
`;

// Nhãn của các trường
export const WrapperLabel = styled.label`
  color: #000000;
  font-size: 16px;
  line-height: 30px;
  font-weight: 600;
  width: 100px;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  transition: font-size 0.3s ease, width 0.3s ease;

  @media (max-width: 1200px) {
    font-size: 15px;
    width: 90px;
  }

  @media (max-width: 992px) {
    font-size: 14px;
    width: 80px;
  }

  @media (max-width: 768px) {
    font-size: 13px;
    width: 70px;
  }

  @media (max-width: 576px) {
    font-size: 12px;
    width: 60px;
  }

  @media (max-width: 480px) {
    font-size: 11px;
    width: 50px;
  }
`;

// Input và bố cục các trường
export const WrapperInput = styled.div`
  display: flex;
  align-items: center;
  gap: 70px;
  transition: gap 0.3s ease;

  @media (max-width: 1200px) {
    gap: 60px;
  }

  @media (max-width: 992px) {
    gap: 50px;
  }

  @media (max-width: 768px) {
    gap: 40px;
  }

  @media (max-width: 576px) {
    gap: 30px;
    flex-direction: column;
    align-items: flex-start;
  }

  @media (max-width: 480px) {
    gap: 20px;
  }

  input {
    width: 300px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;

    &:focus {
      border-color: #fa4f31;
      box-shadow: 0 0 5px rgba(250, 79, 49, 0.5);
    }
  }
`;
