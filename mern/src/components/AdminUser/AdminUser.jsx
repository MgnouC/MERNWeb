import { Form, Input, Button, Modal, Upload, Checkbox } from "antd";
import React, { useState } from "react";
import { WrapperHeader } from "./style";
import { PlusOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as UserService from "../../services/UserServices";
import TableComponentUser from "../TableComponent/TableComponentUser";
import * as message from "../../components/Message/Mesage";
import axios from "axios";

const { confirm } = Modal;

const AdminUser = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingUser, setEditingUser] = useState(null);
  const queryClient = useQueryClient();

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingUser(null);
    form.resetFields();
  };

  const { data: users } = useQuery(["users"], UserService.getAllUser, {
    onError: (error) => {
      message.error("Error fetching users: " + error.message);
    },
  });

  const updateMutation = useMutation(
    ({ id, data }) => UserService.updateUser({ id, data }),
    {
      onSuccess: () => {
        message.success("User updated successfully");
        queryClient.invalidateQueries(["users"]);
        handleCancel();
      },
      onError: (error) =>
        message.error("Error updating user: " + error.message),
    }
  );

  const deleteMutation = useMutation(
    (userId) => UserService.deleteUser(userId),
    {
      onSuccess: () => {
        message.success("User deleted successfully");
        queryClient.invalidateQueries(["users"]);
      },
      onError: (error) =>
        message.error("Error deleting user: " + error.message),
    }
  );

  const handleEdit = (user) => {
    setEditingUser(user._id);
    setIsModalOpen(true);
    form.setFieldsValue(user);
  };

  const banUserMutation = useMutation(
    ({ id, ban }) => UserService.banUser({ id, ban }),
    {
      onSuccess: () => {
        message.success("User ban/unban successfully");
        queryClient.invalidateQueries(["users"]);
      },
      onError: (error) =>
        message.error("Error banning/unbanning user: " + error.message),
    }
  );
  const handleBanUser = (id, banStatus) => {
    console.log(id, banStatus);
    banUserMutation.mutate({ id, ban: banStatus });
    console.log(id, banStatus);
  };
  const showDeleteConfirm = (userId) => {
    confirm({
      title: "Bạn có chắc muốn xóa người dùng này không?",
      icon: <ExclamationCircleOutlined />,
      content: "Thao tác này không thể hoàn tác.",
      okText: "Đồng ý",
      okType: "danger",
      cancelText: "Hủy bỏ",
      onOk() {
        deleteMutation.mutate(userId);
      },
      onCancel() {
        console.log("Hủy xóa người dùng");
      },
    });
  };

  const onFinish = (values) => {
    const formData = {
      name: values.name,
      email: values.email,
      phone: values.phone,
      address: values.address,
      isAdmin: values.isAdmin || false,
    };

    if (editingUser) {
      updateMutation.mutate({ id: editingUser, data: formData });
    } else {
      console.error("No editing user found!");
    }
  };

  return (
    <div>
      <WrapperHeader>Quản Lí Người Dùng</WrapperHeader>
      {/* <Button
        style={{ color: "white", backgroundColor: "#f95230" }}
        onClick={() => {
          setEditingUser(null);
          form.resetFields();
          setIsModalOpen(true);
        }}
        type="primary"
      >
        <PlusOutlined /> Thêm Người Dùng
      </Button> */}
      <div style={{ marginTop: "20px" }}>
        <TableComponentUser
          users={users || []}
          handleEdit={handleEdit}
          handleDelete={showDeleteConfirm}
          handleBanUser={handleBanUser}
        />
      </div>
      <Modal
        title={editingUser ? "Sửa Người Dùng" : "Thêm Người Dùng"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          name="userForm"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Tên Người Dùng"
            name="name"
            rules={[
              { required: true, message: "Vui lòng nhập tên người dùng!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Vui lòng nhập email hợp lệ!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Số Điện Thoại"
            name="phone"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Địa Chỉ"
            name="address"
            rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Admin" name="isAdmin" valuePropName="checked">
            <Checkbox />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={updateMutation.isLoading || deleteMutation.isLoading}
            >
              Xác Nhận
            </Button>
            <Button
              type="default"
              style={{ marginLeft: 8 }}
              onClick={() => form.resetFields()}
            >
              Reset
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminUser;
