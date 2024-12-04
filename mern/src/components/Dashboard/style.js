// src/components/Dashboard/style.js

import styled from "styled-components";

// Màu chủ đạo và phông chữ
const primaryColor = "#f95230";
const fontFamily = "'Roboto', sans-serif";

export const DashboardWrapper = styled.div`
  font-family: ${fontFamily};
  padding-top: 20px;
  padding-bottom: 10px;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StatsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 40px;
`;

export const StatCard = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 25px 10px;
  width: 30%;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }

  h3 {
    font-size: 1.3rem;
    color: ${primaryColor};
    margin-bottom: 10px;
  }

  p {
    font-size: 2rem;
    color: #333;
    font-weight: bold;
  }
`;

export const OrdersContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  h3 {
    font-size: 36px;
    color: ${primaryColor};
    text-align: center;
    margin-bottom: 30px;
  }
`;

export const OrderList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const OrderItem = styled.div`
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: transform 0.3s ease, background-color 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-5px);
    background-color: #f4f4f4;
  }

  .order-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }

  .order-id {
    font-size: 1.2rem;
    font-weight: bold;
    color: ${primaryColor};
  }

  .order-date {
    font-size: 1rem;
    color: #666;
  }

  .order-details {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .order-total-price {
    font-size: 1.2rem;
    font-weight: bold;
    color: #333;
  }

  .order-status {
    width: 50px;
    font-size: 1rem;
    font-weight: bold;
    padding: 6px 12px;
    border-radius: 5px;
    margin-top: 5px;
    text-transform: capitalize;
  }

  .delivered {
    background-color: #4caf50;
    color: white;
  }

  .pending {
    background-color: #ff5722;
    color: white;
  }
`;
