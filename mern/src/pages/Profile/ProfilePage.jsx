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
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as message from "../../components/Message/Mesage";
import { updateUser } from "../../redux/slides/userSlice";
// import { UploadOutlined } from "@ant-design/icons";
// import { Button, Upload } from "antd";
// import { getBase64 } from "../../utils";

const ProfilePage = () => {
  const user = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState("");
  const dispatch = useDispatch("")
  const mutation = useMutationHooks((data) => {
    const { id, ...rests } = data;
    UserService.updateUser(user, data);
  });
  const { data, isError, isSuccess } = mutation;

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
  // const handleOnUploadAvatar = async ({ fileList }) => {
  //   const file = fileList[0];
  //   if (!file.url && !file.preview) {
  //     file.preview = await getBase64(file.originFileObj);
  //   }
  //   setAvatar(file.preview);
  // };
  const handleUpdate = () => {
    mutation.mutate(
      { id: user?.id, name, email, phone, address },
      {
        onSuccess: (data) => {
          dispatch(updateUser(data)); // Cập nhật store khi thành công
        },
        onError: (error) => {
          console.error("Update failed:", error.message);
        }
      }
    );
  };
  

  useEffect(() => {
    if (isSuccess) {
      message.success("Update User successfully");
    } else if (isError) {
      message.error("Update User failed");
    }
  }, [isSuccess, isError]);
  
  useEffect(() => {
    console.log("Current user:", user);
    //dispatch(updateUser(user))
    setName(user?.name);
    setEmail(user?.email);
    setPhone(user?.phone);
    setAddress(user?.address);
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
              //background: "#fa4f31",
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
              //background: "#fa4f31",
              fontSize: "15px",
              fontWeight: "700",
            }}
          ></ButtonComponent>
        </WrapperInput>
        <WrapperInput>
          <WrapperLabel htmlFor="phone">Số điện thoại</WrapperLabel>

          <InputForm
            id="phone"
            type="string"
            placeholder="Nhập số điện thoại của bạn"
            style={{ width: "300px" }}
            value={phone}
            handleonchange={handleOnChangePhone}
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
              //background: "#fa4f31",
              fontSize: "15px",
              fontWeight: "700",
            }}
          ></ButtonComponent>
        </WrapperInput>
        <WrapperInput>
          <WrapperLabel htmlFor="address">Địa chỉ</WrapperLabel>

          <InputForm
            id="address"
            type="string"
            placeholder="Nhập địa chỉ của bạn"
            style={{ width: "300px" }}
            value={address}
            handleonchange={handleOnChangeAddress}
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
              //background: "#fa4f31",
              fontSize: "15px",
              fontWeight: "700",
            }}
          ></ButtonComponent>
        </WrapperInput>
        {/* <WrapperInput>
          <WrapperLabel htmlFor="avatar">Avatar</WrapperLabel>
          <Upload handleonchange={handleOnUploadAvatar}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
          {avatar && (
            <img
              src={avatar}
              alt="avatar"
              style={{
                width: "40px",
                height: "30px",
                objectFit: "cover",
              }}
              alt="avatar"
            />
          )}

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
              //background: "#fa4f31",
              fontSize: "15px",
              fontWeight: "700",
            }}
          ></ButtonComponent>
        </WrapperInput> */}
      </WrapperContentProfile>
    </div>
  );
};

export default ProfilePage;
