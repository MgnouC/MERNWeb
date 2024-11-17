import React, { useState } from "react";
import { Badge, Button, Col, message, Popover } from "antd";
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
import { searchProduct } from "../../redux/slides/productSlice";

const HeaderComponent = () => {
  const navigate = useNavigate();
  const handleNavigateLogin = () => {
    navigate("/sign-in");
  };
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const order = useSelector((state) => state.order);
  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };
  const orderItems = useSelector((state) => state?.order.orderItems);

  const totalQuantity = orderItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const handleSearchClick = () => {
    dispatch(searchProduct(search)); // Dispatch search term when button clicked
  };
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

  const handlerProduct = () => {
    // Kiểm tra xem người dùng đã đăng nhập chưa
    if (!user?.id) {
      message.info("Please log in to add products to cart.");
      navigate("/sign-in");

      return;
    } else {
      navigate("/order")
    }
  };
  const content = (
    <div>
      <WrapperContentPopup onClick={handleLogout}>
        Đăng Xuất
      </WrapperContentPopup>
      <WrapperContentPopup onClick={() => navigate(`/profile-user/${user.id}`)}>
        Thông tin tài khoản
      </WrapperContentPopup>
      {user?.isAdmin && (
        <WrapperContentPopup onClick={() => navigate("/system/admin")}>
          Quản lí hệ thống
        </WrapperContentPopup>
      )}
    </div>
  );

  const onSearch = (e) => {
    setSearch(e.target.value); // Update local search state
    dispatch(searchProduct(e.target.value)); // Dispatch search term with each input change
  };

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

        <Col span={12}>
          <ButtonInputSearch
            size="large"
            textButton="Tìm kiếm"
            variant={false}
            placeholder="Nhập sản phẩm cần tìm"
            onChange={onSearch} // Truyền hàm để cập nhật giá trị tìm kiếm
            onClick={handleSearchClick} // Hàm xử lý khi nhấn nút tìm kiếm
          />
        </Col>

        <Col span={7} style={{ display: "flex", gap: "20px" }}>
          <WrapperHeaderAccount>
            <UserOutlined style={{ fontSize: "30px" }} />
            {user.access_token ? (
              <>
                <Popover content={content} trigger="click">
                  <div style={{ cursor: "pointer", border: "none" }}>
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
          <div onClick={handlerProduct} style={{ cursor: "pointer" }}>
            
            <Badge count={totalQuantity} size="small" margin="2px">
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
