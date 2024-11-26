import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import * as OrderService from "../../services/OrderService";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const PaymentMethodChart = () => {
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
          labels: stats.methods,
          datasets: [
            {
              label: "Số lượng đơn hàng",
              data: stats.counts,
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0",
                "#9966FF",
                "#FF9F40",
              ],
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
    const paymentMethods = {};

    orders.forEach((order) => {
      const method = order.paymentMethod || "Khác";

      if (!paymentMethods[method]) {
        paymentMethods[method] = 0;
      }

      paymentMethods[method] += 1;
    });

    const methods = Object.keys(paymentMethods);
    const counts = methods.map((method) => paymentMethods[method]);

    return { methods, counts };
  };

  if (loading) return <p>Đang tải dữ liệu...</p>;

  return (
    <div style={{ width: "60%", margin: "0 auto" }}>
      <h2>Phương thức thanh toán</h2>
      <Pie
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "right",
            },
            title: {
              display: true,
              text: "Phân bổ phương thức thanh toán",
            },
          },
        }}
      />
    </div>
  );
};

export default PaymentMethodChart;
