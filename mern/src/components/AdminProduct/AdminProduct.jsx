import React from "react";
import { WrapperHeader } from "./style";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import TableComponent from "../TableComponent/TableComponent";

const AdminProduct = () => {
  return (
    <div>
      <WrapperHeader>Quản Lí  Sản Phẩm</WrapperHeader>

      <Button>
        <PlusOutlined />
      </Button>
      <div style={{ marginTop: '20px' }}>
        <TableComponent />
      </div>
    </div>
  );
};

export default AdminProduct;
