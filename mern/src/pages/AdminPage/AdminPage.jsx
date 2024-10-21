import { Menu } from "antd";
import React, { useState } from "react";
import {
  AppstoreOutlined,
  UserOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import AdminUser from "../../components/AdminUser/AdminUser";
import AdminProduct from "../../components/AdminProduct/AdminProduct";

const AdminPage = () => {
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
  ];

  const [stateOpenKeys, setStateOpenKeys] = useState(""); // Make this a string instead of array

  const renderPage = (key) => {
    switch (key) {
      case "user":
        return <AdminUser />;
      case "product":
        return <AdminProduct />;
      default:
        return <></>;
    }
  };

  const handleOnclick = (e) => {
    const { key } = e; // Lấy key của item được click
    console.log("openKeys", key);
    setStateOpenKeys(key); // Set key directly (string)
  };

  return (
    <div style={{ display: "flex", padding: "20px, 100px", color: "#f95230" }}>
      <Menu
        mode="inline"
        defaultSelectedKeys={["231"]}
        selectedKeys={[stateOpenKeys]} // Bind selected key to stateOpenKeys
        style={{
          width: 256,
          height: "100vh",
          background: "#fff",
          boxShadow: "1px 1px 2px #fa4f31",
          top: 0,
          left: 0,
          zIndex: 100,
        }}
        items={items}
        onClick={handleOnclick}
      />
      <div style={{ flex: 1, padding: "20px" }}>
        {renderPage(stateOpenKeys)} {/* Pass the selected key directly */}
      </div>
    </div>
  );
};

export default AdminPage;
