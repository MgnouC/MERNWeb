import React, { useState, useEffect } from "react";
import { WrapperHeader } from "./style";
import { Button, Modal, Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux"; // Thêm import này
import { getAllUser } from "../../services/UserServices"; // Giả sử bạn đã tạo dịch vụ này
import TableComponentUser from "../TableComponent/TableComponentUser";

const AdminUser = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState([]);

  const dispatch = useDispatch();

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Fetch all users when component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUser(); // Gọi hàm lấy dữ liệu
        console.log("Dữ liệu trả về từ API:", response); // Ghi log dữ liệu trả về
        if (response.status === 'OK' && Array.isArray(response.data)) {
          setUsers(response?.data); // Nếu response.data là mảng, gán cho users
        } else {
          console.error("Dữ liệu không phải là mảng:", response.data);
          // Xử lý lỗi ở đây nếu cần
        }
      } catch (error) {
        console.error("Lỗi khi lấy người dùng:", error);
      }
    };

    fetchUsers(); // Gọi hàm fetchUsers
  }, []);

  return (
    <div>
      <WrapperHeader>Quản Lí Người Dùng</WrapperHeader>
      <Button
        style={{ color: "white", backgroundColor: "#f95230" }}
        onClick={() => setIsModalOpen(true)}
        type="primary"
      >
        <PlusOutlined />
      </Button>
      <div style={{ marginTop: "20px" }}>
        <TableComponentUser
          dataSource={users}
          columns={[
            {
              title: "Tên",
              dataIndex: "name",
              key: "name",
            },
            {
              title: "Email",
              dataIndex: "email",
              key: "email",
            },
            // Thêm các cột khác nếu cần
          ]}
          rowKey="_id" // Đặt key cho mỗi hàng
        />
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
