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
import * as XLSX from "xlsx";

const TableComponent = ({ products, handleEdit, handleDelete }) => {
  const data = Array.isArray(products)
    ? products.map((product) => ({
        key: product._id,
        _id: product._id,
        name: product.name,
        price: product.price,
        type: product.type,
        brandType: product.brandType,
        countInStock: product.countInStock,
      }))
    : [];

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <StyledInput
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
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

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(products?.data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Products");

    // Ghi file và tải về
    XLSX.writeFile(workbook, "products_data.xlsx");
  };

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
      title: "Thương Hiệu",
      dataIndex: "brandType",
      key: "brandType",
      render: (brandType) => brandType || "N/A",
      ...getColumnSearchProps("brandType"),  // Thêm tính năng tìm kiếm cho thương hiệu
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type) => type || "N/A",
      ...getColumnSearchProps("type"),  // Thêm tính năng tìm kiếm cho loại sản phẩm
    },
    {
      title: "Count In Stock",
      dataIndex: "countInStock",
      key: "countInStock",
      sorter: (a, b) => a.countInStock - b.countInStock,
    },
    {
      title: "Hình Ảnh",
      dataIndex: "image",
      key: "image",
      render: (imageUrl) => (
        <img
          style={{ height: "80px", width: "100%" }}
          src={`http://localhost:3000/uploads/${imageUrl}`}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/path/to/placeholder-image.png"; // Hình ảnh thay thế
          }}
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <StyledButton onClick={() => handleEdit(record)}>Edit</StyledButton>
          <StyledButton onClick={() => handleDelete(record._id)}>
            Delete
          </StyledButton>
        </>
      ),
    },
  ];

  return (
    <TableContainer>
      <ExportButton
        type="primary"
        onClick={exportToExcel}
        style={{
          color: "white",
          backgroundColor: "#f95230",
          marginBottom: "5px",
        }}
      >
        Export to Excel
      </ExportButton>
      <StyledTable
        columns={columns}
        dataSource={products.data}
        rowKey="key"
        pagination={{
          pageSize: 5,
          position: ["bottomCenter"],
          className: StyledPagination,
        }}
        locale={{ emptyText: "No data available" }}
      />
    </TableContainer>
  );
};

export default TableComponent;
