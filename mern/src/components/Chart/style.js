import styled from 'styled-components';


// Container tổng của Dashboard
export const DashboardContainer = styled.div`
  padding: 20px;
  background-color: #f0f2f5;
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

// Nội dung chính của Dashboard
export const DashboardContent = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: space-between;

  @media (max-width: 992px) {
    flex-direction: column;
    gap: 20px;
  }
`;

// Khu vực biểu đồ
export const ChartArea = styled.div`
  flex: 1;
  margin-right: 20px;

  @media (max-width: 992px) {
    margin-right: 0;
  }
`;

// Khu vực nút
export const ButtonArea = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  @media (max-width: 992px) {
    width: 100%;
  }
`;

// Tiêu đề của Dashboard
export const Title = styled.h1`
  padding: 10px;
  color: #f95230 !important;
  font-size: 32px;
  line-height: 40px;
  font-weight: 500;
  text-align: center;
  margin-bottom: 20px;
  margin-top: 20px;
  border-bottom: 1px solid #f95230;
  @media screen and (max-width: 768px) {
    font-size: 24px;
    line-height: 32px;
  }
  font-family: san-serif;

  
`;

// Container cho biểu đồ
export const ChartContainer = styled.div`
  background-color: #ffffff;
  padding: 20px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  height: 100%;

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

// Nhóm nút hành động
export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  height: 100%;

  button {
    margin-bottom: 10px;
    flex: 1;
    width: 100%;
    background-color: #f95230 ;
    color: #ffffff;
    border: none;
    padding: 10px;
    border-radius: 5px;
    font-size: 14px;
    transition: background-color 0.3s ease;

    &:hover {
      color: #f95230 !important;
      background-color: #d43d1a ;
    }

    &:focus {
      outline: none;
      color: #f95230 !important;
      background-color: #fff !important; ;
      box-shadow: 0 0 5px rgba(249, 82, 48, 0.5);
    }
  }

  @media (max-width: 992px) {
    flex-direction: row;
    flex-wrap: wrap;

    button {
      flex: none;
      width: calc(50% - 5px);
    }
  }
`;

// Thông báo khi đang tải dữ liệu
export const LoadingMessage = styled.p`
  text-align: center;
  font-size: 16px;
  color: #999999;
`;

// Thông báo khi không có dữ liệu
export const NoDataMessage = styled.p`
  text-align: center;
  font-size: 16px;
  color: #999999;
`;
