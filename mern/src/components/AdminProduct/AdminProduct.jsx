import { Form, Input, Button, Modal, Upload } from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import * as ProductService from "../../services/ProductServices";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import TableComponent from "../TableComponent/TableComponent";
import * as message from "../../components/Message/Mesage";
import { WrapperHeader } from "../AdminUser/style";

const AdminProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageBase64, setImageBase64] = useState("");
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const queryClient = useQueryClient();

  // Thay đổi: Đảm bảo gọi API lấy tất cả sản phẩm khi component load (useQuery).
  const { data: products, error } = useQuery(
    ["products"], // Thay đổi: sử dụng mảng thay vì chuỗi
    () => ProductService.getAllProduct(), // Thay đổi: đảm bảo truyền đúng queryFn
    {
      onSuccess: (data) => {
        //console.log("Fetched products:", data); // Log dữ liệu sản phẩm ra console
      },
      onError: (error) => {
        message.error("Error fetching products: " + error.message);
      },
    }
  );

  const createMutation = useMutation(
    (newProduct) => ProductService.createProduct(newProduct),
    {
      onSuccess: () => {
        message.success("Product created successfully");
        queryClient.invalidateQueries("products"); // Thay đổi: Invalidate query để refetch sản phẩm sau khi tạo thành công.
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
        queryClient.invalidateQueries("products"); // Thay đổi: Refetch dữ liệu sản phẩm sau khi update thành công.
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
        queryClient.invalidateQueries("products"); // Thay đổi: Refetch danh sách sản phẩm sau khi xóa thành công.
      },
      onError: (error) =>
        message.error("Error deleting product: " + error.message),
    }
  );

  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("type", values.type);
    formData.append("price", values.price);
    formData.append("countInStock", values.countInStock);
    formData.append("rating", values.rating);
    formData.append("description", values.description);
    formData.append("image", fileList[0]?.originFileObj);

    if (editingProduct) {
      // Thay đổi: Truyền _id vào formData để cập nhật đúng sản phẩm.
      formData.append("id", editingProduct._id);
      updateMutation.mutate(formData);
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
    form.resetFields(); // Thay đổi: Reset form fields khi modal đóng.
    setImageBase64("");
    setEditingProduct(null);
    setFileList([]);
  };

  const handleEdit = (product) => {
    setEditingProduct(product); // Thay đổi: Gán product hiện tại để chỉnh sửa.
    setIsModalOpen(true);
    form.setFieldsValue(product); // Điền dữ liệu vào form khi edit.
    setFileList([
      { uid: "-1", name: "image.png", status: "done", url: product.image },
    ]);
  };

  const handleDelete = (productId) => {
    deleteMutation.mutate(productId); // Truyền productId vào mutation để xóa sản phẩm.
  };

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
      >
        <PlusOutlined />
      </Button>

      <div style={{ marginTop: "20px" }}>
        {/* Thay đổi: Chuyển props 'products' vào TableComponent để hiển thị */}
        <TableComponent
          products={products}
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
            <Input />
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
