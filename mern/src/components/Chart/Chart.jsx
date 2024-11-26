// DashboardCharts.jsx

import React, { useState } from 'react';
import { Button } from 'antd';
import RevenueChart from './RevenueChart';
import PaymentMethodChart from './PaymentMethodChart';
import OrderCountChart from './OrderCountChart';
import {
  DashboardContainer,
  DashboardContent,
  ChartArea,
  ButtonArea,
  Title,
  ChartContainer,
  ButtonGroup,
} from './style';

const Chart = () => {
  const [activeChart, setActiveChart] = useState('revenue');

  const renderChart = () => {
    switch (activeChart) {
      case 'revenue':
        return <RevenueChart />;
      case 'paymentMethod':
        return <PaymentMethodChart />;
      case 'orderCount':
        return <OrderCountChart />;
      default:
        return <RevenueChart />;
    }
  };

  return (
    <DashboardContainer>
      <Title>THỐNG KÊ ĐƠN HÀNG</Title>
      <DashboardContent>
        <ChartArea>
          <ChartContainer>{renderChart()}</ChartContainer>
        </ChartArea>
        <ButtonArea>
          <ButtonGroup>
            <Button
              type={activeChart === 'revenue' ? 'primary' : 'default'}
              onClick={() => setActiveChart('revenue')}
            >
              Doanh thu và số lượng
            </Button>
            <Button
              type={activeChart === 'paymentMethod' ? 'primary' : 'default'}
              onClick={() => setActiveChart('paymentMethod')}
            >
              Phương thức thanh toán
            </Button>
            <Button
              type={activeChart === 'orderCount' ? 'primary' : 'default'}
              onClick={() => setActiveChart('orderCount')}
            >
              Số lượng đơn hàng theo ngày
            </Button>
          </ButtonGroup>
        </ButtonArea>
      </DashboardContent>
    </DashboardContainer>
  );
};

export default Chart;
