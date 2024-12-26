import React from "react";
import { Table, Button } from "antd";
import "./style.css";
import * as XLSX from "xlsx";

const TableComponentUser = ({
  users,
  handleEdit,
  handleDelete,
  handleBanUser,
}) => {
  const data = Array.isArray(users)
    ? users.map((user) => ({
        key: user._id, // Sử dụng _id từ sản phẩm để làm key.
        _id: user._id, // Giữ _id để tiện sử dụng khi delete.
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        isAdmin: user.isAdmin,
        isBanned: user.isBanned,
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
            className={`button-ban ${record.isBanned ? "banned" : ""}`}
            style={{ marginRight: "10px" }}
            onClick={() => handleBanUser(record._id, !record.isBanned)}
          >
            {record.isBanned ? "Unban" : "Ban"}
          </Button>
          {/* <Button
            className={`button-delete ${record.isBanned ? "banned" : ""}`}
            onClick={() => handleBanUser(record._id)}
          >
            Delete
          </Button> */}
        </span>
      ),
    },
  ];

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(users?.data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Products");

    // Ghi file và tải về
    XLSX.writeFile(workbook, "products_data.xlsx");
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={exportToExcel}
        style={{
          color: "white",
          backgroundColor: "#f95230",
          marginBottom: "5px",
        }}
      >
        Export to Excel
      </Button>

      <Table
        dataSource={users?.data} // Dữ liệu người dùng sẽ được truyền từ AdminUser
        columns={columns}
        rowKey="key" // Khóa chính của bảng
        pagination={{
          style: {
            display: "flex",
            justifyContent: "center",
          },
          pageSize: 7,
        }}
        locale={{ emptyText: "No data available" }}
      />
    </div>
  );
};

export default TableComponentUser;
