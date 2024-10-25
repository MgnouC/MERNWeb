import React from "react";
import { Button, Table } from "antd";
import "./style.css";

// Thay đổi: Đảm bảo việc xử lý mảng dữ liệu từ props và map đúng các trường.
const TableComponent = ({ products, handleEdit, handleDelete }) => {
  // Sử dụng _id làm key cho mỗi sản phẩm
  const data = Array.isArray(products)
    ? products.map((product) => ({
        key: product._id, // Sử dụng _id từ sản phẩm để làm key.
        _id: product._id, // Giữ _id để tiện sử dụng khi delete.
        name: product.name,
        price: product.price,
        type: product.type,
        countInStock: product.countInStock,
      }))
    : [];

    //console.log("test", products);
        
    const columns = [
      { title: "Name", dataIndex: "name", key: "name" },
      { title: "Price", dataIndex: "price", key: "price",},
      { title: "Type", dataIndex: "type", key: "type" },
      { title: "Count In Stock", dataIndex: "countInStock", key: "countInStock" },
      {
        title: "Action",
        key: "action",
        render: (_, record) => (
          <>
            <Button className="button-edit" style={{ marginRight: '10px'}} onClick={() => handleEdit(record._id)}>Edit</Button>
            <Button className="button-edit" onClick={() => handleDelete(record._id)}>Delete</Button> {/* Truyền product._id cho hàm handleDelete */}
          </>
        ),
      },
    ];

  // Thay đổi: Chỉnh lại dataSource cho đúng.
  return (
    <Table
      columns={columns}
      dataSource={products?.data}
      rowKey="key" // Vẫn giữ key là _id (được ánh xạ từ key).
      pagination={{ 
        style: {
        color: "#f95230" ,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }, pageSize: 7}}
      locale={{ emptyText: "No data available" }}
    />
  );
};

export default TableComponent;
