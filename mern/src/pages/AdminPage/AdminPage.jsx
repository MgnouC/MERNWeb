import React, { useState } from "react";
import { AppstoreOutlined, UserOutlined } from "@ant-design/icons";
import AdminUser from "../../components/AdminUser/AdminUser";
import AdminProduct from "../../components/AdminProduct/AdminProduct";
import AdminOrder from "../../components/AdminOrder/AdminOrder";
import { AdminPageContainer, StyledMenu, AdminContent } from "./style";
import Chart from "../../components/Chart/Chart";
const AdminPage = () => {
  // Các mục trong menu
  const items = [
    {
      key: "user",
      icon: <UserOutlined />,
      label: "Người Dùng",
      style: { color: "#f95230" },
    },
    {
      key: "product",
      icon: <AppstoreOutlined />,
      label: "Sản Phẩm",
      style: { color: "#f95230" },
    },
    {
      key: "order",
      icon: <AppstoreOutlined />,
      label: "Đơn Hàng",
      style: { color: "#f95230" },
    },
    {
      key: "chart",
      icon: <AppstoreOutlined />,
      label: "Chart",
      style: { color: "#f95230" },
    },
  ];

  // State để lưu giữ key của menu được chọn
  const [stateOpenKeys, setStateOpenKeys] = useState("");

  // Hàm để render nội dung phù hợp với menu được chọn
  const renderPage = (key) => {
    switch (key) {
      case "user":
        return <AdminUser />;
      case "product":
        return <AdminProduct />;
      case "order":
        return <AdminOrder />;
      case "chart":
        return <Chart />;
      default:
        return <></>;
    }
  };

  // Hàm để xử lý sự kiện click vào menu
  const handleOnclick = (e) => {
    const { key } = e;
    setStateOpenKeys(key);
  };

  return (
    <AdminPageContainer>
      <StyledMenu
        mode="inline"
        selectedKeys={[stateOpenKeys]}
        items={items}
        onClick={handleOnclick}
      />
      <AdminContent>{renderPage(stateOpenKeys)}</AdminContent>
    </AdminPageContainer>
  );
};

export default AdminPage;
