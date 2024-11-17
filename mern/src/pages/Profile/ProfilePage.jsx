import React, { useEffect, useState } from "react";
import {
  WrapperContentProfile,
  WrapperHeaderUser,
  WrapperInput,
  WrapperLabel,
} from "./style";
import InputForm from "../../components/InputForm/InputForm";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from "../../services/UserServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as message from "../../components/Message/Mesage";
import { updateUser } from "../../redux/slides/userSlice";

const ProfilePage = () => {
  const user = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  // Sử dụng useMutation để cập nhật user
  const mutation = useMutation(
    ({ id, data }) => UserService.updateUser({ id, data }),
    {
      onSuccess: (response) => {
        console.log("Update successful:", response);
        if (response.data) {
          dispatch(updateUser(response.data)); // Cập nhật thông tin người dùng từ response
          message.success("Cập nhật thông tin thành công");
        }
        queryClient.invalidateQueries(["user"]); // Làm mới dữ liệu người dùng
      },
      onError: (error) => {
        console.error("Update failed:", error);
        message.error("Cập nhật thất bại. Vui lòng thử lại!");
      },
    }
  );

  // Hàm thay đổi giá trị của từng trường
  const handleOnChangeName = (value) => {
    setName(value);
  };
  const handleOnChangeEmail = (value) => {
    setEmail(value);
  };
  const handleOnChangePhone = (value) => {
    setPhone(value);
  };
  const handleOnChangeAddress = (value) => {
    setAddress(value);
  };

  // Hàm xử lý khi người dùng nhấn nút "Lưu"
  const handleUpdate = () => {
    if (!name.trim() || !email.trim() || !phone || !address.trim()) {
      message.error("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    // Tạo đối tượng data với thông tin cần cập nhật
    const data = {
      name,
      email,
      phone,
      address,
    };

    console.log("Sending update data:", { id: user.id, data });

    // Gọi mutation để cập nhật thông tin
    mutation.mutate({ id: user.id, data });
  };

  // Đồng bộ giá trị từ user vào các state khi user thay đổi
  useEffect(() => {
    if (user && user.id) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setAddress(user.address || "");
    }
  }, [user]);

  return (
    <div
      style={{
        minWidth: "1200px",
        margin: "0 auto",
        padding: "10px 128px",
        height: "500px",
      }}
    >
      <WrapperHeaderUser>Hồ sơ cá nhân</WrapperHeaderUser>
      <WrapperContentProfile>
        <WrapperInput>
          <WrapperLabel htmlFor="name">Tên</WrapperLabel>
          <InputForm
            id="name"
            type="text"
            placeholder="Nhập tên của bạn"
            style={{ width: "300px" }}
            value={name}
            handleonchange={handleOnChangeName}
          />
          <ButtonComponent
            onClick={handleUpdate}
            border={false}
            size={40}
            styleButton={{
              background: "#fa4f31",
              color: "#fff",
              fontSize: "15px",
              fontWeight: "500",
              padding: "12px 24px",
              height: "30px",
              width: "40px",
              border: "1px solid #fa4f31",
              borderRadius: "4px",
              padding: "12px",
            }}
            textButton={"Lưu"}
            styleTextButton={{
              fontSize: "15px",
              fontWeight: "700",
            }}
          ></ButtonComponent>
        </WrapperInput>
        <WrapperInput>
          <WrapperLabel htmlFor="email">Email</WrapperLabel>
          <InputForm
            id="email"
            type="email"
            placeholder="Nhập email của bạn"
            style={{ width: "300px" }}
            value={email}
            handleonchange={handleOnChangeEmail}
          />
        </WrapperInput>
        <WrapperInput>
          <WrapperLabel htmlFor="phone">Số điện thoại</WrapperLabel>
          <InputForm
            id="phone"
            type="text"
            placeholder="Nhập số điện thoại của bạn"
            style={{ width: "300px" }}
            value={phone}
            handleonchange={handleOnChangePhone}
          />
        </WrapperInput>
        <WrapperInput>
          <WrapperLabel htmlFor="address">Địa chỉ</WrapperLabel>
          <InputForm
            id="address"
            type="text"
            placeholder="Nhập địa chỉ của bạn"
            style={{ width: "300px" }}
            value={address}
            handleonchange={handleOnChangeAddress}
          />
        </WrapperInput>
        <ButtonComponent
          onClick={handleUpdate}
          border={false}
          size={40}
          styleButton={{
            background: "#fa4f31",
            color: "#fff",
            fontSize: "15px",
            fontWeight: "500",
            padding: "12px 24px",
            height: "30px",
            width: "100px",
            border: "1px solid #fa4f31",
            borderRadius: "4px",
            marginTop: "20px",
          }}
          textButton={"Lưu tất cả"}
          styleTextButton={{
            fontSize: "15px",
            fontWeight: "700",
          }}
        />
      </WrapperContentProfile>
    </div>
  );
};

export default ProfilePage;
