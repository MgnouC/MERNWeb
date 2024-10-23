import React, { useState } from "react";
import { WrapperHeader } from "./style";
import { Button, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import TableComponent from "../TableComponent/TableComponent";

const AdminUser = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <WrapperHeader>Quản Lí Người Dùng</WrapperHeader>
      <Button
      style={{color: 'white', backgroundColor: '#f95230'}}
       onClick={() => setIsModalOpen(true)} type="primary">
        <PlusOutlined />
      </Button>
      <div style={{ marginTop: "20px" }}>
        <TableComponent />
      </div>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  );
};

export default AdminUser;
