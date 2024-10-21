import React from "react";
import { WrapperHeader } from "./style";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import TableComponent from "../TableComponent/TableComponent";

const AdminUser = () => {
  return (
    <div>
      <WrapperHeader>Quản Lí Người Dùng</WrapperHeader>
      <Button>
        <PlusOutlined />
      </Button>
      <div style={{ marginTop: '20px' }}>
        <TableComponent />
      </div>
    </div>
  );
};

export default AdminUser;
