import React from "react";
import { Table, Button } from "antd";

const TableComponentUser = ({ user , handleEdit, handleDelete}) => {
    const data = Array.isArray(user)
    ? user.map((user) => ({
        key: user._id, // Sử dụng _id từ sản phẩm để làm key.
        _id: user._id, // Giữ _id để tiện sử dụng khi delete.
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,

      }))
    : [];
  // Cột của bảng
  const columns = [
    {
      title: "ID",
      dataIndex: "_id", // Tương ứng với trường _id trong dữ liệu người dùng
      key: "_id",
    },
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
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Thao tác",
      key: "action",
      render: (text, record) => (
        <span>
          <Button type="link" onClick={() => handleEdit(record)}>
            Chỉnh sửa
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record._id)}>
            Xóa
          </Button>
        </span>
      ),
    },
  ];

//   const handleEdit = (record) => {
//     // Thêm logic chỉnh sửa người dùng tại đây
//     console.log("Chỉnh sửa người dùng:", record);
//   };

//   const handleDelete = (id) => {
//     // Thêm logic xóa người dùng tại đây
//     console.log("Xóa người dùng có ID:", id);
//   };

  return (
    <Table
      dataSource={user?.data} // Dữ liệu người dùng sẽ được truyền từ AdminUser
      columns={columns}
      rowKey="key" // Khóa chính của bảng
      pagination={{ pageSize: 10 }} // Chia trang, có thể điều chỉnh theo nhu cầu
    />
  );
};

export default TableComponentUser;
