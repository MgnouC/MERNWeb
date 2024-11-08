import React from "react";
import { Button, Table, Input } from "antd";
import * as XLSX from "xlsx";
import { SearchOutlined } from "@ant-design/icons";
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

  // Column search function
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => confirm()}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => confirm()}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={clearFilters} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"), // Adds search functionality to Name
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price, // Adds sorting to Price
      render: (price) => `$${price.toFixed(2)}`,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type) => type || "N/A",
      filters: products && products.length > 0
        ? Array.from(new Set(products.map((product) => product.type.label))).map((label) => ({
            text: label,
            value: label,
          }))
        : [],
      onFilter: (value, record) => record.type && record.type.label === value,
    },     // {
    //   title: "Type",
    //   dataIndex: "type",
    //   key: "type",
    //   //render: (type) => (type ? type.label : "N/A"),
    //   filters: [
    //     { text: "Electronics", value: "Electronics" },
    //     { text: "Furniture", value: "Furniture" },
    //     { text: "Clothing", value: "Clothing" },
    //   ], // Adds filtering options for Type
    //   onFilter: (value, record) => record.type.includes(value),
    // },
    {
      title: "Count In Stock",
      dataIndex: "countInStock",
      key: "countInStock",
      sorter: (a, b) => a.countInStock - b.countInStock, // Adds sorting to Count In Stock
    },
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

  // Function to export data to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(products?.data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Products");

    // Write file and download
    XLSX.writeFile(workbook, "products_data.xlsx");
  };

  return (
    <div>
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
      </div>

      <Table
        columns={columns}
        dataSource={products?.data}
        rowKey="key" // Primary key of the table
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
