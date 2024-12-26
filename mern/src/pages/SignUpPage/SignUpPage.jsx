import React, { useEffect, useState } from "react";
import InputForm from "../../components/InputForm/InputForm";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import imageLogo from "../../assets/images/logo.png";
import { Image } from "antd";
import {
  WrapperContainerLeft,
  WrapperContainerRight,
  WrapperTextLight,
} from "../SignInPage/style";
import * as UserService from "../../services/UserServices";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as message from "../../components/Message/Mesage";

const SignUpPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = () => {
    if (!email || !password || !confirmPassword) {
      message.error("Vui lòng nhập email và mật khẩu!");
      return;
    }
    mutation.mutate({ email, password, confirmPassword });
  };

  const handleNavigateSignIn = () => {
    window.location.href = "/sign-in";
  };

  const mutation = useMutationHooks((data) => UserService.signupUser(data));

  const { data, isSuccess, isError } = mutation;

  useEffect(() => {
    if (isSuccess) {
      message.success("Sign up successfully");
      handleNavigateSignIn();
    }
    if (isError) {
      message.error("Tên đăng nhập đã tồn tạitại");
    }
  }, [isSuccess, isError]);

  const handleonchangeEmail = (value) => {
    setEmail(value);
  };
  const handleonchangePassword = (value) => {
    setPassword(value);
  };
  const handleonchangeConfirmPassword = (value) => {
    setConfirmPassword(value);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#efefef",
        height: "100vh",
      }}
    >
      <div>
        <div
          style={{
            fontFamily: "san-serif",
            display: "flex",
            width: "500x",
            height: "415px",
            background: "white",
            borderRadius: "20px",
          }}
        >
          <WrapperContainerLeft>
            <h1>Xin chào,</h1>
            <p>Tạo liền cái tài khoản còn đi mua sắm thôi</p>

            <InputForm
              placeholder="tentui@gmail.com"
              value={email}
              handleonchange={handleonchangeEmail}
            />

            <div style={{ position: "relative" }}>
              <span
                onClick={() => setIsShowPassword(!isShowPassword)}
                style={{
                  position: "absolute",
                  top: "8px",
                  right: "8px",
                  zIndex: 10,
                  cursor: "pointer",
                }}
              >
                {isShowPassword ? (
                  <span class="show-pass">Hiện</span>
                ) : (
                  <span class="show-pass">Ẩn</span>
                )}
              </span>
              <InputForm
                placeholder="passla123nha"
                type={isShowPassword ? "text" : "password"}
                value={password}
                handleonchange={handleonchangePassword}
              />
            </div>
            <div style={{ position: "relative" }}>
              <span
                style={{
                  position: "absolute",
                  top: "8px",
                  right: "8px",
                  zIndex: 10,
                }}
              >
                {isShowPassword ? (
                  <span class="show-pass">Hiện</span>
                ) : (
                  <span class="show-pass">Ẩn</span>
                )}
              </span>
              <InputForm
                placeholder="bamlannuachochac"
                type={isShowPassword ? "text" : "password"}
                value={confirmPassword}
                handleonchange={handleonchangeConfirmPassword}
              />
            </div>

            {data?.status === 200 && (
              <p style={{ color: "green" }}>Đăng nhập thành công</p>
            )}
            <ButtonComponent
              disabled={!email.length || !password.length || !confirmPassword.length} // Đảm bảo button bị vô hiệu hóa
              onClick={handleSignUp}
              size={40}
              styleButton={{
                padding: "0 20px",
                background: "#ee4d2d",
                height: "48px",
                width: "100%",
                border: "none",
                borderRadius: "2px",
                boxShadow: "0 1px 1px 0 rgba(0, 0, 0, .09)",
                margin: "26px 0px 10px",
              }}
              textButton={"Đăng ký ngay"}
              styleTextButton={{ color: "#fff", fontSize: "14px" }}
            ></ButtonComponent>
            <p>
              <WrapperTextLight>Quên mật khẩu?</WrapperTextLight>
            </p>
            <p>
              Có tài khoản rồi hả?{" "}
              <WrapperTextLight onClick={handleNavigateSignIn}>
                Nhập liền đi
              </WrapperTextLight>
            </p>
          </WrapperContainerLeft>
          <WrapperContainerRight>
            <Image
              src={imageLogo}
              preview={false}
              alt="image-logo"
              height="203px"
              weight="203px"
            />
            <h4>Mua tùm lum thứ tại SELLSOME</h4>
          </WrapperContainerRight>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
