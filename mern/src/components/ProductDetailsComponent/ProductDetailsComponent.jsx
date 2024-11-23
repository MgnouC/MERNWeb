import { Col, Image, Row } from "antd";
import React, { useState } from "react";
import {
  MinusOutlined,
  PlusOutlined,
  StarFilled,
  StarTwoTone,
} from "@ant-design/icons";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { useQuery } from "@tanstack/react-query";
import * as message from "../../components/Message/Mesage";
import * as ProductService from "../../services/ProductServices";
import { useDispatch, useSelector } from "react-redux";
import {
  StyledInputNumber,
  WrapperAddresstProduct,
  WrapperPriceProduct,
  WrapperPriceTextProduct,
  WrapperQualityProduct,
  WrapperStyleImageSmall,
  WrapperStyleNameProduct,
  WrapperStyleTextSell,
  WrapperTextLight,
} from "./style";
import { addOrderProduct } from "../../redux/slides/orderSlice";
import { useEffect } from "react";
const ProductDetailsComponent = ({ idProduct }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const {
    data: productResponse,
    isLoading,
    isError,
  } = useQuery(
    ["product", idProduct],
    () => ProductService.getDetailsProduct(idProduct),
    {
      enabled: !!idProduct, // Chỉ thực hiện truy vấn khi có idProduct
      onError: (error) => {
        message.error(
          "Error fetching product: " + (error.message || "Unknown error")
        );
      },
    }
  );
  const user = useSelector((state) => state.user);

  const cartItems = useSelector((state) => state.cartItems);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !productResponse || !productResponse.data) {
    return (
      <div>
        Error loading product details:{" "}
        {productResponse?.message || "Unknown error"}
      </div>
    );
  }
  const product =
    productResponse?.data && Array.isArray(productResponse.data)
      ? productResponse.data[0]
      : productResponse.data;

  const handleAddOrderProduct = () => {
    // Kiểm tra xem người dùng đã đăng nhập chưa
    if (!user?.id) {
      message.info("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.");
      return;
    }

    // Kiểm tra xem sản phẩm còn hàng không
    if (product.countInStock === 0) {
      message.error("Sản phẩm đã hết hàng!");
      return;
    }

    dispatch(
      addOrderProduct({
        ...product,
        id: product._id,
        quantity: quantity,
      })
    );

    message.success("Sản phẩm đã được thêm vào giỏ hàng!");
  };

  const handleInputChange = (value) => {
    if (value >= 1 && value <= product.countInStock) {
      setQuantity(value);
    } else if (product.countInStock > 0) {
      setQuantity(1);
    } else {
      setQuantity(0);
    }
  };
  const pricebefore = product.price + (product.price * 5) / 100;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !productResponse || !productResponse.data) {
    return (
      <div>
        Error loading product details:{" "}
        {productResponse?.message || "Unknown error"}
      </div>
    );
  }

  // Extract product data from the response

  return (
    <Row style={{ padding: "15px", background: "#fff" }}>
      <Col span={10}>
        <Image
          src={`http://localhost:3000/uploads/${product.image}`}
          alt={product.name}
          preview={false}
          style={{ width: "100%", height: "100%" }}
          onError={(e) => {
            e.target.onerror = null;
          }}
        />
        <Row
          style={{
            display: "flex",
            paddingTop: "10px",
            justifyContent: "space-between",
          }}
        >
          {[...Array(5)].map((_, i) => (
            <Col span={4} key={i}>
              <WrapperStyleImageSmall
                src={`http://localhost:3000/uploads/${product.image}`}
                alt="imageSmall"
                preview={false}
              />
            </Col>
          ))}
        </Row>
      </Col>
      <Col span={14} style={{ padding: "20px 0 35px 20px" }}>
        {/* <WrapperStyleNameProduct>{product.name}</WrapperStyleNameProduct> */}
        <WrapperStyleNameProduct>{product.name}</WrapperStyleNameProduct>
        {product.countInStock === 0 && (
          <span style={{ color: "red", fontWeight: "bold" }}>Hết Hàng</span>
        )}
        <div>
          <WrapperStyleTextSell>
            {[...Array(5)].map((_, i) => {
              // Kiểm tra để xác định loại sao cần hiển thị
              if (i + 1 <= Math.floor(product.rating)) {
                // Sao đầy đủ
                return (
                  <StarFilled
                    key={i}
                    style={{ fontSize: "16px", color: "#fac700" }}
                  />
                );
              } else if (i < product.rating) {
                // Sao nửa
                return (
                  <StarTwoTone
                    key={i}
                    twoToneColor="#fac700"
                    style={{ fontSize: "16px" }}
                  />
                );
              } else {
                // Sao trống
                return (
                  <StarFilled
                    key={i}
                    style={{ fontSize: "16px", color: "#ddd" }}
                  />
                );
              }
            })}
            | Đã bán {product.sell || "100+"}+
          </WrapperStyleTextSell>
        </div>
        <WrapperPriceProduct>
          <span style={{ fontSize: "16px", fontWeight: "500" }}>
            Mua ngay với giá
          </span>
          <WrapperPriceTextProduct>
            {product.price ? `${product.price.toLocaleString()} $` : "N/A"}
          </WrapperPriceTextProduct>
          <span style={{ fontSize: "16px", fontWeight: "500" }}>
            tiết kiệm ngay so với{" "}
            <span
              style={{
                color: "#ee8216",
                fontSize: "24px",
                textDecoration: "line-through",
              }}
            >
              {pricebefore ? `${pricebefore.toLocaleString()} $` : "N/A"}{" "}
            </span>
          </span>
        </WrapperPriceProduct>

        <WrapperAddresstProduct>
          <span>Đem Hàng Đến </span>
          <span className="address">{user.address}</span>
          <span className="change-address">Đổi điểm hẹn</span>
        </WrapperAddresstProduct>
        <div style={{ margin: "10px 0 20px", gap: "8px", display: "grid" }}>
          <div>
            Số Lượng:{" "}
            <span style={{ color: "#fa4f31", fontSize: "18px" }}>
              {product.countInStock}
            </span>{" "}
            sản phẩm
          </div>
          <WrapperQualityProduct>
            <button
              style={{ border: "none", background: "transparent" }}
              onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
              disabled={product.countInStock === 0}
            >
              <MinusOutlined style={{ color: "#fa4f31", fontSize: "20px" }} />
            </button>
            <StyledInputNumber
              min={1}
              max={product.countInStock}
              value={quantity}
              onChange={handleInputChange}
              readOnly
            />
            <button
              style={{ border: "none", background: "transparent" }}
              onClick={() =>
                setQuantity(
                  quantity < product.countInStock ? quantity + 1 : quantity
                )
              }
              disabled={
                quantity >= product.countInStock || product.countInStock === 0
              }
            >
              <PlusOutlined style={{ color: "#fa4f31", fontSize: "20px" }} />
            </button>
          </WrapperQualityProduct>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {product.countInStock > 0 ? (
            <>
              <ButtonComponent
                size={40}
                styleButton={{
                  padding: "0 20px",
                  background: "#ffeee7",
                  height: "48px",
                  width: "250px",
                  border: "1px solid #ee4d2d",
                  borderRadius: "2px",
                  boxShadow: "0 1px 1px 0 rgba(0, 0, 0, .09)",
                }}
                textButton={"Bỏ Vào Giỏ Hàng"}
                styleTextButton={{ color: "#ee4d2d", fontSize: "14px" }}
                // Thêm onClick nếu cần thiết
              />
              <ButtonComponent
                border={false}
                size={40}
                styleButton={{
                  padding: "0 20px",
                  background: "#ee4d2d",
                  height: "48px",
                  width: "250px",
                  border: "none",
                  borderRadius: "2px",
                  boxShadow: "0 1px 1px 0 rgba(0, 0, 0, .09)",
                }}
                onClick={handleAddOrderProduct}
                textButton={"Mua Ngay Đi"}
                styleTextButton={{ color: "#fff", fontSize: "14px" }}
              />
            </>
          ) : (
            <ButtonComponent
              size={40}
              disabled={true}
              styleButton={{
                padding: "0 20px",
                background: "gray",
                height: "48px",
                width: "250px",
                border: "none",
                borderRadius: "2px",
                boxShadow: "0 1px 1px 0 rgba(0, 0, 0, .09)",
              }}
              textButton={"Hết Hàng"}
              styleTextButton={{ color: "#fff", fontSize: "14px" }}
            />
          )}
        </div>

        <div style={{ paddingTop: "20px" }}>
          <WrapperTextLight>Mô Tả Sản Phẩm</WrapperTextLight>
          <p>{product.description}</p>
        </div>
      </Col>
    </Row>
  );
};

export default ProductDetailsComponent;
