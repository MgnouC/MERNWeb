import { Form, Input, Button, Modal, Upload, Select, InputNumber } from "antd";
import { PlusOutlined, UploadOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import * as ProductService from "../../services/ProductServices";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import TableComponent from "../TableComponent/TableComponent";
import * as message from "../../components/Message/Mesage";
import { WrapperHeader } from "../AdminUser/style";
import { renderOptions } from "../../utils";

const { confirm } = Modal;

const AdminProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageBase64, setImageBase64] = useState("");
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const queryClient = useQueryClient();
  const [adding, setAdding] = useState(false);
  const [newType, setNewType] = useState("");
  const { data: products } = useQuery(["products"], ProductService.getAllProduct, {
    onError: (error) => {
      message.error("Error fetching products: " + error.message);
    },
  });

  const fetchAllTypeProduct = async () => {
    try {
      const response = await ProductService.getAllType();
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

  const createMutation = useMutation(
    (newProduct) => ProductService.createProduct(newProduct),
    {
      onSuccess: () => {
        message.success("Product created successfully");
        queryClient.invalidateQueries("products");
        handleCancel();
      },
      onError: (error) => message.error("Error creating product: " + error.message),
    }
  );

  const updateMutation = useMutation(
    (updateProduct) => ProductService.updateProduct(updateProduct),
    {
      onSuccess: () => {
        message.success("Product updated successfully");
        queryClient.invalidateQueries(["products"]);
        handleCancel();
      },
      onError: (error) => message.error("Error updating product: " + error.message),
    }
  );

  const deleteMutation = useMutation(
    (productId) => ProductService.deleteProduct(productId),
    {
      onSuccess: () => {
        message.success("Product deleted successfully");
        queryClient.invalidateQueries("products");
      },
      onError: (error) => message.error("Error deleting product: " + error.message),
    }
  );

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

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setImageBase64("");
    setEditingProduct(null);
    setFileList([]);
  };

  const handleEdit = (product) => {
    setEditingProduct(product._id);
    setIsModalOpen(true);
    form.setFieldsValue({ ...product, imageUrl: product.image });
    setFileList([
      { uid: "-1", name: product.image, status: "done", url: product?.image },
    ]);
  };

  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
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

    if (editingProduct) {
      updateMutation.mutate({ id: editingProduct, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  return (
    <div>
      <WrapperHeader>Quản Lí Sản Phẩm</WrapperHeader>

      <Button
        style={{ color: "white", backgroundColor: "#f95230" }}
        onClick={() => {
          setIsModalOpen(true);
          setEditingProduct(null);
        }}
        type="primary"
      >
        <PlusOutlined /> Thêm Sản Phẩm
      </Button>

      <div style={{ marginTop: "20px" }}>
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
            label="Tên Sản Phẩm"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Loại Sản Phẩm"
            name="type"
            rules={[{ required: true, message: "Vui lòng chọn loại sản phẩm!" }]}
          >
            <Select
              placeholder="--- Chọn ---"
              dropdownRender={(menu) => (
                <div>
                  {menu}
                  <div style={{ display: "flex", flexWrap: "nowrap", padding: 8 }}>
                    <Button
                      type="link"
                      onClick={() => setAdding(true)}
                      style={{ width: "100%", textAlign: "left" }}
                      icon={<PlusOutlined />}
                    >
                      Thêm loại mới
                    </Button>
                  </div>
                </div>
              )}
              options={renderOptions(typeProduct.data || [])}
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
                `VND ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
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
            rules={[{ required: true, message: "Vui lòng nhập mô tả sản phẩm!" }]}
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
              maxCount={1}
              fileList={fileList}
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
