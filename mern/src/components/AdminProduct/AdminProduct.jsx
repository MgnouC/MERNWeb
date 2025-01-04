// src/components/AdminProduct/AdminProduct.jsx

import { Form, Input, Button, Modal, Upload, Select, InputNumber } from "antd";
import {
  PlusOutlined,
  UploadOutlined,
  ExclamationCircleOutlined,
  FileExcelOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import * as ProductService from "../../services/ProductServices";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import TableComponent from "../TableComponent/TableComponent";
import * as message from "../../components/Message/Mesage";
import { WrapperHeader } from "../AdminUser/style";
import * as XLSX from "xlsx";

const { confirm } = Modal;

const AdminProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);

  // State cho việc thêm mới loại sản phẩm (type)
  const [addingType, setAddingType] = useState(false);
  const [newType, setNewType] = useState("");

  // State cho việc thêm mới thương hiệu (brandType)
  const [addingBrand, setAddingBrand] = useState(false);
  const [newBrand, setNewBrand] = useState("");

  const queryClient = useQueryClient();

  // Fetch products
  const { data: products, isLoading: isProductsLoading } = useQuery(
    ["products"],
    ProductService.getAllProduct,
    {
      onError: (error) => {
        message.error("Error fetching products: " + error.message);
      },
    }
  );

  // Fetch product types
  const { data: typesResponse, isLoading: isTypesLoading } = useQuery(
    ["types"],
    ProductService.getAllType,
    {
      onError: (error) => {
        message.error("Error fetching product types: " + error.message);
      },
      select: (data) => {
        if (data && Array.isArray(data.data)) {
          return data.data.map((type) => ({ value: type, label: type }));
        }
        return [];
      },
    }
  );

  // Fetch brand types
  const { data: brandsResponse, isLoading: isBrandsLoading } = useQuery(
    ["brands"],
    ProductService.getAllBrandTypes,
    {
      onError: (error) => {
        message.error("Error fetching brand types: " + error.message);
      },
      select: (data) => {
        if (data && Array.isArray(data.data)) {
          return data.data.map((brand) => ({ value: brand, label: brand }));
        }
        return [];
      },
    }
  );

  // Process types and brands data
  const types = Array.isArray(typesResponse) ? typesResponse : [];
  const brands = Array.isArray(brandsResponse) ? brandsResponse : [];

  // Mutation for creating a product
  const createMutation = useMutation(
    (newProduct) => ProductService.createProduct(newProduct),
    {
      onSuccess: () => {
        message.success("Product created successfully");
        queryClient.invalidateQueries("products");
        handleCancel();
      },
      onError: (error) =>
        message.error("Error creating product: " + error.message),
    }
  );

  // Mutation for updating a product
  const updateMutation = useMutation(
    ({ id, data }) => ProductService.updateProduct({ id, data }),
    {
      onSuccess: () => {
        message.success("Product updated successfully");
        queryClient.invalidateQueries("products");
        handleCancel();
      },
      onError: (error) =>
        message.error("Error updating product: " + error.message),
    }
  );

  // Mutation for deleting a product
  const deleteMutation = useMutation(
    (productId) => ProductService.deleteProduct(productId),
    {
      onSuccess: () => {
        message.success("Product deleted successfully");
        queryClient.invalidateQueries("products");
      },
      onError: (error) =>
        message.error("Error deleting product: " + error.message),
    }
  );

  // Handle image upload change
  const handleOnChangeImage = ({ fileList }) => {
    setFileList(fileList);
  };

  // Confirm delete product
  const handleDelete = (productId) => {
    confirm({
      title: "Bạn có chắc muốn xóa sản phẩm này không?",
      icon: <ExclamationCircleOutlined />,
      content: "Thao tác này không thể hoàn tác.",
      okText: "Đồng ý",
      okType: "danger",
      cancelText: "Hủy bỏ",
      onOk() {
        deleteMutation.mutate(productId);
      },
    });
  };

  // Open modal for add/edit
  const handleOpenModal = (product = null) => {
    if (product) {
      setEditingProductId(product._id);
      form.setFieldsValue({
        ...product,
        imageUrl: product.image,
      });
      setFileList([
        {
          uid: "-1",
          name: product.image,
          status: "done",
          url: product.image,
        },
      ]);
    } else {
      setEditingProductId(null);
      form.resetFields();
      setFileList([]);
    }
    setIsModalOpen(true);
  };

  // Cancel modal
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setEditingProductId(null);
    setFileList([]);
    setAddingType(false);
    setNewType("");
    setAddingBrand(false);
    setNewBrand("");
  };

  // Handle adding new type
  const handleAddType = () => {
    if (newType.trim()) {
      if (Array.isArray(types)) {
        // Kiểm tra sự tồn tại bất kể viết hoa hay viết thường
        const exists = types.some(
          (type) =>
            type.value &&
            type.value.toLowerCase() === newType.trim().toLowerCase()
        );
        if (exists) {
          message.warning("Loại sản phẩm đã tồn tại!");
        } else {
          const newTypeObj = { value: newType.trim(), label: newType.trim() };

          // Cập nhật mảng các loại sản phẩm
          const updatedTypes = [...types, newTypeObj];
          queryClient.setQueryData(["types"], updatedTypes);

          // Đóng chế độ thêm và reset giá trị
          setAddingType(false);
          setNewType("");

          // Tự động chọn loại mới vừa thêm
          form.setFieldsValue({ type: newTypeObj.value });
          message.success("Thêm loại sản phẩm mới thành công!");
        }
      } else {
        message.error(
          "Không thể thêm loại sản phẩm mới vì dữ liệu loại không hợp lệ!"
        );
      }
    } else {
      message.warning("Vui lòng nhập tên loại sản phẩm mới!");
    }
  };

  // Handle adding new brandType
  const handleAddBrand = () => {
    if (newBrand.trim()) {
      if (Array.isArray(brands)) {
        // Kiểm tra sự tồn tại bất kể viết hoa hay viết thường
        const exists = brands.some(
          (brand) =>
            brand.value &&
            brand.value.toLowerCase() === newBrand.trim().toLowerCase()
        );
        if (exists) {
          message.warning("Thương hiệu sản phẩm đã tồn tại!");
        } else {
          const newBrandObj = {
            value: newBrand.trim(),
            label: newBrand.trim(),
          };

          // Cập nhật mảng các thương hiệu sản phẩm
          const updatedBrands = [...brands, newBrandObj];
          queryClient.setQueryData(["brands"], updatedBrands);

          // Đóng chế độ thêm và reset giá trị
          setAddingBrand(false);
          setNewBrand("");

          // Tự động chọn thương hiệu mới vừa thêm
          form.setFieldsValue({ brandType: newBrandObj.value });
          message.success("Thêm thương hiệu sản phẩm mới thành công!");
        }
      } else {
        message.error(
          "Không thể thêm thương hiệu sản phẩm mới vì dữ liệu thương hiệu không hợp lệ!"
        );
      }
    } else {
      message.warning("Vui lòng nhập tên thương hiệu sản phẩm mới!");
    }
  };

  // Dropdown render cho Select components
  const renderDropdown = (category) => (
    <div>
      <div style={{ display: "flex", flexWrap: "nowrap", padding: 8 }}>
        {category.name === "type" && addingType ? (
          <>
            <Input
              style={{ flex: "auto" }}
              value={newType}
              onChange={(e) => setNewType(e.target.value)}
              onPressEnter={handleAddType}
              placeholder="Nhập loại mới"
            />
            <Button
              type="primary"
              onClick={handleAddType}
              icon={<PlusOutlined />}
              style={{ marginLeft: 8 }}
            >
              Thêm
            </Button>
            <Button
              onClick={() => {
                setAddingType(false);
                setNewType("");
              }}
              style={{ marginLeft: 8 }}
            >
              Hủy
            </Button>
          </>
        ) : category.name === "brand" && addingBrand ? (
          <>
            <Input
              style={{ flex: "auto" }}
              value={newBrand}
              onChange={(e) => setNewBrand(e.target.value)}
              onPressEnter={handleAddBrand}
              placeholder="Nhập thương hiệu mới"
            />
            <Button
              type="primary"
              onClick={handleAddBrand}
              icon={<PlusOutlined />}
              style={{ marginLeft: 8 }}
            >
              Thêm
            </Button>
            <Button
              onClick={() => {
                setAddingBrand(false);
                setNewBrand("");
              }}
              style={{ marginLeft: 8 }}
            >
              Hủy
            </Button>
          </>
        ) : (
          <Button
            type="link"
            onClick={() => {
              if (category.name === "type") {
                setAddingType(true);
              } else if (category.name === "brand") {
                setAddingBrand(true);
              }
            }}
            style={{ width: "100%", textAlign: "left" }}
            icon={<PlusOutlined />}
          >
            Thêm {category.name === "type" ? "loại" : "thương hiệu"} mới
          </Button>
        )}
      </div>
    </div>
  );

  // Handle form submission
  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("brandType", values.brandType);
    formData.append("type", values.type);
    formData.append("price", values.price);
    formData.append("countInStock", values.countInStock);
    formData.append("rating", values.rating);
    formData.append("description", values.description);

    if (fileList && fileList.length > 0) {
      if (fileList[0].originFileObj) {
        formData.append("image", fileList[0].originFileObj);
      } else if (values.imageUrl) {
        formData.append("image", values.imageUrl);
      }
    } else if (values.imageUrl) {
      formData.append("image", values.imageUrl);
    }

    if (editingProductId) {
      updateMutation.mutate({ id: editingProductId, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  return (
    <div>
      <WrapperHeader>Quản Lí Sản Phẩm</WrapperHeader>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <Button
          type="primary"
          style={{ backgroundColor: "#f95230", borderColor: "#f95230" }}
          onClick={() => handleOpenModal()}
          icon={<PlusOutlined />}
        >
          Thêm Sản Phẩm
        </Button>
      </div>

      <TableComponent
        products={products || []}
        handleEdit={handleOpenModal}
        handleDelete={handleDelete}
        isLoading={isProductsLoading}
      />

      <Modal
        title={editingProductId ? "Chỉnh sửa Sản Phẩm" : "Thêm mới Sản Phẩm"}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose
      >
        <Form
          form={form}
          name="productForm"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Tên Sản Phẩm"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Thương Hiệu"
            name="brandType"
            rules={[{ required: true, message: "Vui lòng chọn thương hiệu!" }]}
          >
            <Select
              placeholder="--- Chọn ---"
              options={brands}
              value={form.getFieldValue("brandType") || undefined}
              onChange={(value) => form.setFieldsValue({ brandType: value })}
              optionFilterProp="label"
              dropdownRender={(menu) => (
                <div>
                  {menu}
                  <div style={{ padding: 8, display: "flex", gap: "10px" }}>
                    {addingBrand ? (
                      <>
                        <Input
                          style={{ flex: 1 }}
                          value={newBrand}
                          onChange={(e) => setNewBrand(e.target.value)}
                          onPressEnter={handleAddBrand}
                          placeholder="Nhập thương hiệu mới"
                        />
                        <Button type="primary" onClick={handleAddBrand}>
                          Thêm
                        </Button>
                        <Button onClick={() => setAddingBrand(false)}>
                          Hủy
                        </Button>
                      </>
                    ) : (
                      <Button
                        type="link"
                        onClick={() => setAddingBrand(true)}
                        style={{ width: "100%", textAlign: "center" }}
                      >
                        Thêm thương hiệu mới
                      </Button>
                    )}
                  </div>
                </div>
              )}
            />
          </Form.Item>

          <Form.Item
            label="Loại Sản Phẩm"
            name="type"
            rules={[{ required: true, message: "Please input type product!" }]}
          >
            <Select
              placeholder="--- Chọn ---"
              options={types} // Danh sách loại đã fetch
              value={form.getFieldValue("type") || undefined}
              onChange={(value) => form.setFieldsValue({ type: value })}
              optionFilterProp="label"
              dropdownRender={(menu) => (
                <div>
                  {menu}
                  <div style={{ padding: 8, display: "flex", gap: "10px" }}>
                    {addingType ? (
                      <>
                        <Input
                          style={{ flex: 1 }}
                          value={newType}
                          onChange={(e) => setNewType(e.target.value)}
                          onPressEnter={handleAddType}
                          placeholder="Nhập loại mới"
                        />
                        <Button type="primary" onClick={handleAddType}>
                          Thêm
                        </Button>
                        <Button onClick={() => setAddingType(false)}>
                          Hủy
                        </Button>
                      </>
                    ) : (
                      <Button
                        type="link"
                        onClick={() => setAddingType(true)}
                        style={{ width: "100%", textAlign: "center" }}
                      >
                        Thêm loại mới
                      </Button>
                    )}
                  </div>
                </div>
              )}
            />
          </Form.Item>
          <Form.Item
            label="Giá"
            name="price"
            rules={[{ required: true, message: "Vui lòng nhập giá sản phẩm!" }]}
          >
            <InputNumber
              min={1}
              style={{ width: "100%" }}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " $"
              }
              parser={
                (value) => value.replace(/[^0-9]/g, "") // Loại bỏ mọi ký tự không phải số
              }
            />
          </Form.Item>

          <Form.Item
            label="Số Lượng"
            name="countInStock"
            rules={[
              { required: true, message: "Vui lòng nhập số lượng sản phẩm!" },
            ]}
          >
            <InputNumber min={1} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Đánh Giá"
            name="rating"
            rules={[{ required: true, message: "Vui lòng nhập đánh giá!" }]}
          >
            <InputNumber min={0} max={5} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Mô Tả"
            name="description"
            rules={[
              { required: true, message: "Vui lòng nhập mô tả sản phẩm!" },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item
            label="Hình Ảnh"
            name="image"
            rules={[{ required: true, message: "Vui lòng tải lên hình ảnh!" }]}
          >
            <Upload
              onChange={handleOnChangeImage}
              fileList={fileList}
              beforeUpload={() => false} // Ngăn chặn upload tự động
              listType="picture"
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Chọn Hình Ảnh</Button>
            </Upload>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={createMutation.isLoading || updateMutation.isLoading}
            >
              Xác Nhận
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminProduct;
