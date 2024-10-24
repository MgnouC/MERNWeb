import { Form, Input, Button, Modal, Upload } from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import * as ProductService from "../../services/ProductServices"; // Import ProductService cho việc tạo sản phẩm
import { useMutation } from "@tanstack/react-query";
import { WrapperHeader } from "./style";
import TableComponent from "../TableComponent/TableComponent";

const AdminProduct = () => {
  const [stateProduct, setStateProduct] = useState([]); // State để lưu danh sách sản phẩm
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageBase64, setImageBase64] = useState(""); // State để lưu ảnh base64
  const [form] = Form.useForm(); // Sử dụng form instance để điều khiển form
  const [fileList, setFileList] = useState([]);
  
  //ProductService.createProduct(newProduct),
  // Hàm mutation dùng để gửi dữ liệu sản phẩm đến backend
  const mutation = useMutation(
    (newProduct) => ProductService.createProduct(newProduct),
    {
      onSuccess: (data) => {
        console.log("Product created successfully:", data);
        handleCancel(); // Reset form và đóng modal sau khi thành công
      },
      onError: (error) => {
        console.error("Error creating product:", error);
      },
    }
  );
  // Hàm xử lý khi người dùng submit form
  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('type', values.type);
    formData.append('price', values.price);
    formData.append('countInStock', values.countInStock);
    formData.append('rating', values.rating);
    formData.append('description', values.description);
    formData.append('image', fileList[0].originFileObj);
    mutation.mutate(formData);
};
  // Hàm xử lý khi upload hình ảnh
  const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file); // Đọc file dưới dạng URL base64
    reader.onload = () => resolve(reader.result); // Khi file được đọc xong, trả về base64
    reader.onerror = (error) => reject(error); // Xử lý lỗi nếu có
  });
};


  const handleOnChangeImage = async ({ fileList }) => {
    if (fileList.length > 0) {
      const file = fileList[0].originFileObj; // Lấy file ảnh được chọn
      const base64 = await getBase64(file); // Chuyển đổi file ảnh thành base64
      setImageBase64(base64); // Lưu base64 vào state imageBase64
    }
    setFileList(fileList); // Cập nhật fileList để hiển thị ảnh đã chọn
  };
  

  // Hàm đóng modal và reset form
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields(); // Reset toàn bộ giá trị trong form
    setImageBase64(""); // Reset lại ảnh
  };

  return (
    <div>
      <WrapperHeader>Quản Lí Sản Phẩm</WrapperHeader>

      <Button
        style={{ color: "white", backgroundColor: "#f95230" }}
        onClick={() => setIsModalOpen(true)}
        type="primary"
      >
        <PlusOutlined />
      </Button>

      <div style={{ marginTop: "20px" }}>
        <TableComponent />
      </div>
      <Modal
        title="Thêm mới Sản Phẩm"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form} // Gắn form instance vào Form
          name="productForm"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          onFinish={onFinish} // Xử lý khi submit form
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
            rules={[{ required: true, message: "Please input image product!" }]}
          >
            <Upload
              onChange={handleOnChangeImage}
              maxCount={1}
              fileList={fileList} // Không sử dụng `value`, mà là `fileList`
            >
              <Button icon={<UploadOutlined />}>Select File</Button>
            </Upload>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={mutation.isLoading}
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
