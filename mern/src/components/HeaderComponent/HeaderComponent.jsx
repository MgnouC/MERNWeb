import React, { useState } from "react";
import { Badge, message, Popover } from "antd";
import {
  HeaderContainer,
  LogoWrapper,
  SearchWrapper,
  AccountWrapper,
  CartWrapper,
  UserName,
  AccountOptions,
} from "./style";
import { CaretDownOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as UserService from "../../services/UserServices";
import { resetUser } from "../../redux/slides/userSlice";
import { searchProduct } from "../../redux/slides/productSlice";

const HeaderComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const user = useSelector((state) => state.user);
  const orderItems = useSelector((state) => state?.order.orderItems);
  const totalQuantity = orderItems.reduce((total, item) => total + item.quantity, 0);

  const handleInputChange = (e) => {
    setSearch(e.target.value);
    dispatch(searchProduct(e.target.value));
  };

  const handleLogout = async () => {
    try {
      await UserService.logoutUser();
      localStorage.removeItem("access_token");
      dispatch(resetUser());
      window.location.reload();
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const handleNavigateLogin = () => {
    navigate("/sign-in");
  };

  const handleCartClick = () => {
    if (!user?.id) {
      message.info("Vui lòng đăng nhập để xem giỏ hàng.");
      navigate("/sign-in");
    } else {
      navigate("/order");
    }
  };

  const accountMenu = (
    <AccountOptions>
      <p onClick={handleLogout}>Đăng Xuất</p>
      <p onClick={() => navigate(`/profile-user/${user.id}`)}>Thông tin tài khoản</p>
      <p onClick={() => navigate(`/my-order/${user.id}`)}>Đơn hàng của tôi</p>
      {user?.isAdmin && (
        <p onClick={() => navigate("/system/admin")}>Quản lí hệ thống</p>
      )}
    </AccountOptions>
  );

  return (
    <HeaderContainer>
      <LogoWrapper onClick={() => navigate("/")}>
        SELLSOME
      </LogoWrapper>

      <SearchWrapper>
        <ButtonInputSearch
          size="large"
          textButton="Tìm kiếm"
          variant={false}
          placeholder="Nhập sản phẩm cần tìm"
          onChange={handleInputChange}
        />
      </SearchWrapper>

      <AccountWrapper>
        <UserOutlined style={{ fontSize: "30px" , marginLeft: '1px'}} />
        {user.access_token ? (
          <Popover content={accountMenu} trigger="click">
            <UserName>{user?.name || user?.email}</UserName>
          </Popover>
        ) : (
          <div onClick={handleNavigateLogin}>
            <span>Đăng nhập/Đăng ký</span>
            <div>
              <span>Tài Khoản</span>
              <CaretDownOutlined />
            </div>
          </div>
        )}
      </AccountWrapper>

      <CartWrapper onClick={handleCartClick}>
        <Badge count={totalQuantity} size="small">
          <ShoppingCartOutlined style={{ fontSize: "30px" }} />
        </Badge>
        <span>Giỏ Hàng</span>
      </CartWrapper>
    </HeaderContainer>
  );
};

export default HeaderComponent;
