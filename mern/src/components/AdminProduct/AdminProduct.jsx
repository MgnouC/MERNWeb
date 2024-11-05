import { Form, Input, Button, Modal, Upload, Select } from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { useEffect, useState, useCallback } from "react";
import * as ProductService from "../../services/ProductServices";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import TableComponent from "../TableComponent/TableComponent";
import * as message from "../../components/Message/Mesage";
import { WrapperHeader } from "../AdminUser/style";
import { renderOptions } from "../../utils";

const AdminProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageBase64, setImageBase64] = useState("");
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const queryClient = useQueryClient();
  const [typeProducts, setTypeProducts] = useState([]); // Danh sách loại sản phẩm
  const [adding, setAdding] = useState(false);
  const [newType, setNewType] = useState("");
  const { data: products, refetch } = useQuery(
    ["products"],
    ProductService.getAllProduct,
    {
      onError: (error) => {
        message.error("Error fetching products: " + error.message);
      },
    }
  );

  const fetchAllTypeProduct = async () => {
    try {
      const response = await ProductService.getAllType();
      console.log("API Response:", response);
      // Đảm bảo rằng response trả về theo cấu trúc mong đợi
      if (!response || !response.data || !Array.isArray(response.data)) {
        throw new Error("All type product not found or data format is incorrect");
      }
      return response.data;
    } catch (error) {
      console.error("Error fetching all type product:", error.message);
      throw error;
    }
  };
  
  
  

  const typeProduct = useQuery({
    queryKey: ["type"],
    queryFn: fetchAllTypeProduct,
  });

  console.log("typeProduct", typeProduct);

  const createMutation = useMutation(
    (newProduct) => ProductService.createProduct(newProduct),
    {
      onSuccess: () => {
        message.success("Product created successfully");
        queryClient.invalidateQueries("products"); // Làm mới danh sách sau khi thêm sản phẩm.
        handleCancel();
      },
      onError: (error) =>
        message.error("Error creating product: " + error.message),
    }
  );

  const updateMutation = useMutation(
    (updateProduct) => ProductService.updateProduct(updateProduct),
    {
      onSuccess: () => {
        message.success("Product updated successfully");
        queryClient.invalidateQueries(["products"]); // Làm mới danh sách sau khi cập nhật sản phẩm.
        handleCancel();
      },
      onError: (error) =>
        message.error("Error updating product: " + error.message),
    }
  );

  const deleteMutation = useMutation(
    (productId) => ProductService.deleteProduct(productId),
    {
      onSuccess: () => {
        message.success("Product deleted successfully");
        queryClient.invalidateQueries("products"); // Làm mới danh sách sau khi xóa sản phẩm.
      },
      onError: (error) =>
        message.error("Error deleting product: " + error.message),
    }
  );

  const handleAddType = () => {
    if (newType.trim()) {
      if (typeProduct?.data && Array.isArray(typeProduct?.data)) {
        const exists = typeProduct.data.some(
          (type) =>
            type.value && type.value.toLowerCase() === newType.trim().toLowerCase()
        );
        if (exists) {
          message.warning("Loại sản phẩm đã tồn tại!");
        } else {
          const newTypeObj = { value: newType.trim(), label: newType.trim() };
  
          // Cập nhật cache của react-query
          queryClient.setQueryData(["type"], (oldData = []) => {
            return [...oldData, newTypeObj];
          });
  
          // Đóng chế độ thêm và reset giá trị
          setAdding(false);
          setNewType("");
  
          // Tự động chọn loại mới vừa thêm
          form.setFieldsValue({ type: newTypeObj.value });
  
          message.success("Thêm loại sản phẩm mới thành công!");
        }
      } else {
        message.error("Không thể thêm loại sản phẩm mới vì dữ liệu loại không hợp lệ!");
      }
    } else {
      message.warning("Vui lòng nhập tên loại sản phẩm mới!");
    }
  };
  
  

  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("type", values.type);
    formData.append("price", values.price);
    formData.append("countInStock", values.countInStock);
    formData.append("rating", values.rating);
    formData.append("description", values.description);

    if (fileList && fileList?.length > 0) {
      formData.append("image", fileList[0]?.originFileObj);
    }

    // Log ra để kiểm tra payload
    console.log("Payload to send:", [...formData]);

    if (editingProduct) {
      console.log("Editing Product ID:", editingProduct);
      updateMutation.mutate({ id: editingProduct, data: formData }); // Gọi với ID và data
      // updateMutation.mutate(formData);
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleOnChangeImage = ({ fileList }) => {
    setFileList(fileList);
    if (fileList.length > 0) {
      const file = fileList[0].originFileObj;
      const reader = new FileReader();
      reader.onload = () => setImageBase64(reader.result);
      reader.readAsDataURL(file);
    } else {
      setImageBase64("");
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setImageBase64("");
    setEditingProduct(null);
    setFileList([]);
  };

  const handleEdit = (product) => {
    //console.log(product);
    setEditingProduct(product._id);
    setIsModalOpen(true);
    form.setFieldsValue(product);
    setFileList([
      { uid: "-1", name: "image.png", status: "done", url: product?.image },
    ]);
  };

  const handleDelete = (productId) => {
    deleteMutation.mutate(productId);
  };
  const dropdownRender = (menu) => (
    <div>
      {menu}
      <div style={{ display: "flex", flexWrap: "nowrap", padding: 8 }}>
        {adding ? (
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
              // Không còn sử dụng loading vì không có mutation
            >
              Thêm
            </Button>
            <Button
              onClick={() => {
                setAdding(false);
                setNewType("");
              }}
              style={{ marginLeft: 8 }}
            >
              Hủy
            </Button>
          </>
        ) : (
          <Button
            type="link"
            onClick={() => setAdding(true)}
            style={{ width: "100%", textAlign: "left" }}
            icon={<PlusOutlined />}
          >
            Thêm loại mới
          </Button>
        )}
      </div>
    </div>
  );
  return (
    <div>
      <WrapperHeader>Quản Lí Sản Phẩm</WrapperHeader>

      <Button
        style={{ color: "white", backgroundColor: "#f95230" }}
        onClick={() => {
          setIsModalOpen(true);
          setEditingProduct(null); // Khi nhấn Thêm mới, đảm bảo form được làm mới.
        }}
        type="primary"
        Add
        Product
      >
        <PlusOutlined /> Add Product
      </Button>

      <div style={{ marginTop: "20px" }}>
        {/* Thay đổi: Chuyển props 'products' vào TableComponent để hiển thị */}
        <TableComponent
          products={products || []}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </div>

      <Modal
        title={editingProduct ? "Chỉnh sửa Sản Phẩm" : "Thêm mới Sản Phẩm"}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
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
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input name product!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Type"
            name="type"
            rules={[{ required: true, message: "Please input type product!" }]}
          >
            <Select
              //showSearch
              placeholder="--- Chọn ---"
              //optionFilterProp="children"
              filterOption={(input, option) =>
                option.toLowerCase().includes(option.toLowerCase())
              }
              dropdownRender={dropdownRender}
              options={renderOptions(typeProduct.data)}
              // Không sử dụng defaultValue, để form quản lý giá trị
            />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please input price product!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Count In Stock"
            name="countInStock"
            rules={[
              { required: true, message: "Please input countInStock product!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Rating"
            name="rating"
            rules={[
              { required: true, message: "Please input rating product!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Please input description product!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Image"
            name="image"
            rules={[{ required: true, message: "Please upload an image!" }]}
          >
            <Upload
              onChange={handleOnChangeImage}
              maxCount={1}
              fileList={fileList}
            >
              <Button icon={<UploadOutlined />}>Select File</Button>
            </Upload>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={createMutation.isLoading || updateMutation.isLoading}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminProduct;
