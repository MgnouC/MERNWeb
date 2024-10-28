import { Form, Input, Button, Modal, Upload } from "antd";
import React, { useState, useEffect } from "react";
import { WrapperHeader } from "./style";
import { PlusOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as UserService from "../../services/UserServices"; // Giả sử bạn đã tạo dịch vụ này
import TableComponentUser from "../TableComponent/TableComponentUser";
import * as message from "../../components/Message/Mesage";

const AdminUser = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const queryClient = useQueryClient();

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const { data: users, error } = useQuery(
    ["users"],
    UserService.getAllUser,
    {
      onSuccess: (data) => {
        console.log("Fetched users:", data);
      },
      onError: (error) => {
        message.error("Error fetching users: " + error.message);
      },
    }
  );

  const updateMutation = useMutation(
    (updateUser) => UserService.updateUser(updateUser),
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
    (deleteUser) => UserService.deleteUser(deleteUser),
    {
      onSuccess: () => {
        message.success("User deleted successfully");
        queryClient.invalidateQueries("users");
      },
      onError: (error) =>
        message.error("Error deleting user: " + error.message),
    }
  );

  const handleEdit = (users) => {
    //console.log(users)
    setEditingUser(users._id);
    setIsModalOpen(true);
    form.setFieldsValue(users);
    setFileList([{ uid: "-1", name: "image.png", status: "done" }]);
  };

  const handleDelete = (userId) => {
    deleteMutation.mutate(userId);
  };

  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("phone", values.phone);
    formData.append("address", values.address);
    //formData.append("password", values.password || "");  // Cẩn thận với các giá trị undefined
    formData.append("isAdmin", values.isAdmin || false);

    if (editingUser) {
      //console.log("Editing Product ID:", editingUser);
      updateMutation.mutate({ id: editingUser, data: formData });
    } else {
      console.error("No editing user found!");
    }
  }
  

  return (
    <div>
      <WrapperHeader>Quản Lí Người Dùng</WrapperHeader>
      <Button
        style={{ color: "white", backgroundColor: "#f95230" }}
        onClick={() => {
          setEditingUser(null);
          setIsModalOpen(true);
        }}
        type="primary"
      >
        <PlusOutlined /> Add User
      </Button>
      <div style={{ marginTop: "20px" }}>
        <TableComponentUser
          users={users || []}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          columns={[
            {
              title: "Tên",
              dataIndex: "name",
              key: "name",
            },
            {
              title: "Email",
              dataIndex: "email",
              key: "email",
            },
            {
              title: "Admin",
              dataIndex: "isAdmin",
              key: "isAdmin",
              render: (isAdmin) => (isAdmin ? "Yes" : "No"),
            },
            {
              title: "Action",
              key: "action",
              render: (_, record) => (
                <>
                  <Button onClick={() => handleEdit(record)}>Edit</Button>
                  <Button
                    danger
                    style={{ marginLeft: 8 }}
                    onClick={() => handleDelete(record._id)}
                  >
                    Delete
                  </Button>
                </>
              ),
            },
          ]}
          rowKey="_id"
        />
      </div>
      <Modal
        title={editingUser ? "Edit User" : "Add User"}
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
            label="Username"
            name="name"
            rules={[{ required: true, message: "Please input username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: "Please input phone number!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please input address!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Admin" name="isAdmin" valuePropName="checked">
            <Input type="checkbox" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={updateMutation.isLoading || deleteMutation.isLoading}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminUser;
