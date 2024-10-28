import React from "react";
import { Button, Table } from "antd";
import * as XLSX from "xlsx";
import "./style.css";

const TableComponent = ({ products, handleEdit, handleDelete }) => {
  const data = Array.isArray(products)
    ? products.map((product) => ({
        key: product._id,
        _id: product._id,
        name: product.name,
        price: product.price,
        type: product.type,
        countInStock: product.countInStock,
      }))
    : [];

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Price", dataIndex: "price", key: "price" },
    { title: "Type", dataIndex: "type", key: "type" },
    { title: "Count In Stock", dataIndex: "countInStock", key: "countInStock" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
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
        </>
      ),
    },
  ];

  // Hàm xuất dữ liệu ra Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(products?.data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Products");

    // Ghi file và tải về
    XLSX.writeFile(workbook, "products_data.xlsx");
  };

  return (
    <div>
      <div >
        <Button
          type="primary"
          onClick={exportToExcel}
          style={{ color: "white", backgroundColor: "#f95230" , marginBottom: '5px'}}
        >
          Export to Excel
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={products?.data}
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
    </div>
  );
};

export default TableComponent;
