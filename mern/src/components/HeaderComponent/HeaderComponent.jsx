import React from "react";
import { Badge, Button, Col, Popover } from "antd";
import {
  WrapperContentPopup,
  WrapperHeader,
  WrapperHeaderAccount,
  WrapperTextHeader,
  WrapperTextHeaderSmall,
} from "./styled";
import Search from "antd/es/transfer/search";
import {
  CaretDownOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import * as UserService from "../../services/UserServices";
import { useDispatch } from "react-redux";
import { resetUser } from "../../redux/slides/userSlice";

const HeaderComponent = () => {
  const navigate = useNavigate();
  const handleNavigateLogin = () => {
    navigate("/sign-in");
  };

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const handleLogout = async () => {
    try {
      await UserService.logoutUser(); // Gọi API đăng xuất
      localStorage.removeItem("access_token"); // Xóa token khỏi localStorage
      dispatch(resetUser()); // Xóa thông tin trong Redux bằng cách reset
      window.location.reload(); // Làm mới trang nếu cần
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const content = (
    <div>
      <WrapperContentPopup onClick={handleLogout}>
        Đăng Xuất
      </WrapperContentPopup>
      <WrapperContentPopup onClick={() => navigate("/profile-user")}>
        Thông tin tài khoản
      </WrapperContentPopup>
      {user?.isAdmin && (
        <WrapperContentPopup onClick={() => navigate("/system/admin")}>
          Quản lí hệ thống
        </WrapperContentPopup>
      )}
    </div>
  );

  return (
    <div
      style={{
        minWidth: "1200px",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <WrapperHeader gutter={[16]}>
        <Col span={6}>
          <WrapperTextHeader
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            SELLSOME
          </WrapperTextHeader>
        </Col>

        <Col span={13}>
          <ButtonInputSearch
            size="large"
            textButton="Tìm kiếm"
            variant={false}
            placeholder="Nhập sản phẩm cần tìm"
          />
        </Col>

        <Col span={8} style={{ display: "flex", gap: "20px" }}>
          <WrapperHeaderAccount>
            <UserOutlined style={{ fontSize: "30px" }} />
            {user.access_token ? (
              <>
                <Popover content={content} trigger="click">
                  <div style={{ cursor: "pointer" }}>
                    {user?.name || user?.email}
                  </div>
                </Popover>
              </>
            ) : (
              <div onClick={handleNavigateLogin} style={{ cursor: "pointer" }}>
                <WrapperTextHeaderSmall>
                  Đăng nhập/Đăng ký
                </WrapperTextHeaderSmall>
                <div>
                  <WrapperTextHeaderSmall>Tài Khoản</WrapperTextHeaderSmall>
                  <CaretDownOutlined />
                </div>
              </div>
            )}
          </WrapperHeaderAccount>
          <div>
            <Badge count={4} size="small" margin="2px">
              <ShoppingCartOutlined
                style={{
                  fontSize: "30px",
                  color: "#ededed",
                  paddingTop: "3px ",
                }}
              />
            </Badge>
            <WrapperTextHeaderSmall>Giỏ Hàng</WrapperTextHeaderSmall>
          </div>
        </Col>
      </WrapperHeader>
    </div>
  );
};

export default HeaderComponent;
