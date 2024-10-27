import React from "react";
import { Table, Button } from "antd";
import "./style.css";

const TableComponentUser = ({ users, handleEdit, handleDelete }) => {
  const data = Array.isArray(users)
    ? users.map((user) => ({
        key: user._id, // Sử dụng _id từ sản phẩm để làm key.
        _id: user._id, // Giữ _id để tiện sử dụng khi delete.
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        isAdmin: user.isAdmin,
      }))
    : [];
  // Cột của bảng
  const columns = [
    // {
    //   title: "ID",
    //   dataIndex: "_id", // Tương ứng với trường _id trong dữ liệu người dùng
    //   key: "_id",
    // },
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
      title: "Admin",
      dataIndex: "isAdmin",
      key: "isAdmin",
      render: (isAdmin) => (isAdmin ? "Admin" : " "),
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <span>
          <Button
            className="button-edit"
            style={{ marginRight: "10px" }}
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Button
            className="button-edit"
            onClick={() => handleDelete(record._id)}
          >
            Delete
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
      dataSource={users?.data} // Dữ liệu người dùng sẽ được truyền từ AdminUser
      columns={columns}
      rowKey="key" // Khóa chính của bảng
      pagination={{
        style: {
          color: "#f95230",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
        pageSize: 7,
      }}
      locale={{ emptyText: "No data available" }}
    />
  );
};

export default TableComponentUser;
