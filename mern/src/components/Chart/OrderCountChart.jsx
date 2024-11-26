import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import * as OrderService from "../../services/OrderService";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const OrderCountChart = () => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        // Lấy danh sách tất cả đơn hàng
        const response = await OrderService.getAllOrder();
        const orders = response.data.data;

        // Xử lý dữ liệu
        const stats = processOrderData(orders);

        // Chuẩn bị dữ liệu cho biểu đồ
        const data = {
          labels: stats.dates,
          datasets: [
            {
              label: "Số lượng đơn hàng",
              data: stats.counts,
              fill: false,
              borderColor: "rgba(75,192,192,1)",
              tension: 0.1,
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
    const ordersByDate = {};

    orders.forEach((order) => {
      const date = new Date(order.createdAt);
      const day = date.toISOString().split("T")[0]; // Định dạng YYYY-MM-DD

      if (!ordersByDate[day]) {
        ordersByDate[day] = 0;
      }

      ordersByDate[day] += 1;
    });

    const dates = Object.keys(ordersByDate).sort(
      (a, b) => new Date(a) - new Date(b)
    );
    const counts = dates.map((date) => ordersByDate[date]);

    return { dates, counts };
  };

  if (loading) return <p>Đang tải dữ liệu...</p>;

  return (
    <div style={{ width: "80%", margin: "0 auto" }}>
      <h2>Số lượng đơn hàng theo ngày</h2>
      <Line
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Số lượng đơn hàng theo ngày",
            },
          },
        }}
      />
    </div>
  );
};

export default OrderCountChart;
