import React from "react";
import { Button, Table } from "antd";

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

    console.log("test", products);
    
    

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
            <Button onClick={() => handleEdit(record)}>Edit</Button>
            <Button onClick={() => handleDelete(record._id)}>Delete</Button> {/* Truyền product._id cho hàm handleDelete */}
          </>
        ),
      },
    ];

  // Thay đổi: Chỉnh lại dataSource cho đúng.
  return (
    <Table
      columns={columns}
      dataSource={products.data}
      rowKey="key" // Vẫn giữ key là _id (được ánh xạ từ key).
      pagination={{ pageSize: 15 }}
      locale={{ emptyText: "No data available" }}
    />
  );
};

export default TableComponent;
