import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import * as OrderService from "../../services/OrderService";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RevenueChart = () => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        // Fetch all orders from the service
        const response = await OrderService.getAllOrder();
const orders = response.data.data;
        // Process orders to calculate statistics
        const stats = processOrderData(orders);

        // Prepare data for the chart
        const data = {
          labels: stats.months,
          datasets: [
            {
              label: "Doanh thu ($)",
              data: stats.revenue,
              backgroundColor: "rgba(75, 192, 192, 0.6)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
            {
              label: "Số lượng đơn hàng",
              data: stats.orderCounts,
              backgroundColor: "rgba(153, 102, 255, 0.6)",
              borderColor: "rgba(153, 102, 255, 1)",
              borderWidth: 1,
            },
          ],
        };

        setChartData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };

    fetchOrderData();
  }, []);

  const processOrderData = (orders) => {
    const revenueByMonth = {};
    const orderCountByMonth = {};

    orders.forEach((order) => {
      const date = new Date(order.createdAt);
      const month = `${date.getMonth() + 1}/${date.getFullYear()}`; // Format: MM/YYYY

      // Initialize month data if not exists
      if (!revenueByMonth[month]) {
        revenueByMonth[month] = 0;
        orderCountByMonth[month] = 0;
      }

      // Add revenue and count
      revenueByMonth[month] += order.totalPrice || 0;
      orderCountByMonth[month] += 1;
    });

    const months = Object.keys(revenueByMonth).sort((a, b) => new Date(a) - new Date(b));
    const revenue = months.map((month) => revenueByMonth[month]);
    const orderCounts = months.map((month) => orderCountByMonth[month]);

    return { months, revenue, orderCounts };
  };

  if (loading) return <p>Đang tải dữ liệu...</p>;

  return (
    <div style={{ width: "80%", margin: "0 auto" }}>
      <h2>Thống kê đơn hàng</h2>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Thống kê doanh thu và số lượng đơn hàng theo tháng",
            },
          },
        }}
      />
    </div>
  );
};

export default RevenueChart;
