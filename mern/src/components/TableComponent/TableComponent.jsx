import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import {
  TableContainer,
  StyledTable,
  StyledButton,
  ExportButton,
  StyledPagination,
  StyledInput,
} from "./style"; // Import các styled-components

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

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <StyledInput
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => confirm()}
        />
        <StyledButton type="primary" onClick={() => confirm()} size="small">
          Search
        </StyledButton>
        <StyledButton onClick={clearFilters} size="small">
          Reset
        </StyledButton>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
      render: (price) => `$${price.toFixed(2)}`,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type) => type || "N/A",
    },
    {
      title: "Count In Stock",
      dataIndex: "countInStock",
      key: "countInStock",
      sorter: (a, b) => a.countInStock - b.countInStock,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <StyledButton onClick={() => handleEdit(record)}>Edit</StyledButton>
          <StyledButton onClick={() => handleDelete(record._id)}>Delete</StyledButton>
        </>
      ),
    },
  ];

  return (
    <TableContainer>
      <ExportButton onClick={() => console.log("Export to Excel")}>
        Export to Excel
      </ExportButton>
      <StyledTable
        columns={columns}
        dataSource={products.data}
        rowKey="key"
        pagination={{
          pageSize: 7,
          position: ["bottomCenter"],
          className: StyledPagination,
        }}
        locale={{ emptyText: "No data available" }}
      />
    </TableContainer>
  );
};

export default TableComponent;
