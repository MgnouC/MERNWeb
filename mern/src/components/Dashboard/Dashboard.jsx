import React, { useEffect, useState } from "react";
import styled from "styled-components";
import * as UserService from "../../services/UserServices";
import * as OrderService from "../../services/OrderService";
import * as ProductService from "../../services/ProductServices";
import {
  DashboardWrapper,
  StatsContainer,
  StatCard,
  OrdersContainer,
  OrderList,
  OrderItem,
} from "./style";

const Dashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [monthlyRevenue, setMonthlyRevenue] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0); // Thay đổi từ bestSellingProducts thành totalOrders
  const [newOrders, setNewOrders] = useState([]);

  const fetchStatistics = async () => {
    try {
      // Lấy tổng số người dùng
      const usersData = await UserService.getAllUser();
      setTotalUsers(usersData.data.length);

      const currentMonth = new Date().getMonth() + 1;
      const currentYear = new Date().getFullYear();
      const allOrdersResponse = await OrderService.getAllOrder();

      if (
        allOrdersResponse.status === 200 &&
        allOrdersResponse.data &&
        Array.isArray(allOrdersResponse.data.data)
      ) {
        const allOrders = allOrdersResponse.data.data;

        // Lọc các đơn hàng trong tháng hiện tại
        const ordersThisMonth = allOrders.filter((order) => {
          const orderDate = new Date(order.createdAt);
          return (
            orderDate.getMonth() + 1 === currentMonth &&
            orderDate.getFullYear() === currentYear
          );
        });

        // Tính doanh thu tháng này
        const revenue = ordersThisMonth.reduce(
          (acc, order) => acc + order.totalPrice,
          0
        );
        setMonthlyRevenue(revenue);

        // Cập nhật tổng số đơn hàng trong tháng này
        setTotalOrders(ordersThisMonth.length);

        // Lọc và lấy 5 đơn hàng mới nhất
        const sortedOrders = allOrders.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        const recentOrders = sortedOrders.slice(0, 5);
        setNewOrders(recentOrders);
      }
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

  return (
    <DashboardWrapper>
      <StatsContainer>
        <StatCard>
          <h3>Tổng số người dùng</h3>
          <p>{totalUsers}</p>
        </StatCard>
        <StatCard>
          <h3>Doanh thu tháng này</h3>
          <p>{monthlyRevenue.toLocaleString()} $</p>
        </StatCard>
        <StatCard>
          <h3>Tổng số đơn hàng trong tháng</h3>
          <p>{totalOrders} </p> {/* Hiển thị tổng số đơn hàng */}
        </StatCard>
      </StatsContainer>
      <OrdersContainer>
        <h3 style={{ fontSize: "36px" }}>Danh sách đơn hàng mới</h3>
        <OrderList>
          {newOrders.map((order) => (
            <OrderItem key={order._id}>
              <span className="order-id">#{order._id}</span>
              <span className="order-date">
                {new Date(order.createdAt).toLocaleDateString()}
              </span>
              <span className="order-total-price">
                {order.totalPrice.toLocaleString()} $
              </span>
              <span
                className={`order-status ${
                  order.isDelivered ? "delivered" : "pending"
                }`}
              >
                {order.isDelivered ? "Đã giao" : "Chưa giao"}
              </span>
            </OrderItem>
          ))}
        </OrderList>
      </OrdersContainer>
    </DashboardWrapper>
  );
};

export default Dashboard;
