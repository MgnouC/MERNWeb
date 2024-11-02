import { Col, Grid, Image, InputNumber, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import imageProduct from "../../assets/images/cafe.webp";
import imageProductSmall from "../../assets/images/cafe2.webp";
import {
  StyledInputNumber,
  WrapperAddresstProduct,
  WrapperBtnQualityProduct,
  WrapperPriceProduct,
  WrapperPriceTextProduct,
  WrapperQualityProduct,
  WrapperStyleImageSmall,
  WrapperStyleNameProduct,
  WrapperStyleTextSell,
} from "./style";
import { MinusOutlined, PlusOutlined, StarFilled } from "@ant-design/icons";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as message from "../../components/Message/Mesage";
import * as ProductService from "../../services/ProductServices";
import { useSelector } from 'react-redux';
const ProductDetailsComponent = ({ idProduct }) => {
  //console.log("idProduct", idProduct);
  const onChange = () => {};
  const [quantity, setQuantity] = useState(1);
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
 const user = useSelector ((state) => state.user)
 console.log(user)
  const handleInputChange = (value) => {
    if (value >= 1 && value <= product.countInStock) {
      setQuantity(value);
    }
  };

  // Log để kiểm tra dữ liệu trả về
  //console.log("Product data:", productResponse);

  const onQuantityChange = (value) => {
    setQuantity(value);
  };

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

  // Trích xuất dữ liệu sản phẩm từ response
  const product = productResponse.data;
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
            e.target.src = "path/to/placeholder-image.png";
          }}
        />

        <Row
          style={{
            display: "flex",
            paddingTop: "10px",
            justifyContent: "space-between",
          }}
        >
          <Col span={4}>
            <WrapperStyleImageSmall
              src={`http://localhost:3000/uploads/${product.image}`}
              alt="imageSmall"
              preview="false"
            />
          </Col>
          <Col span={4}>
            <WrapperStyleImageSmall
              src={`http://localhost:3000/uploads/${product.image}`}
              alt="imageSmall"
              preview="false"
            />
          </Col>
          <Col span={4}>
            <WrapperStyleImageSmall
              src={`http://localhost:3000/uploads/${product.image}`}
              alt="imageSmall"
              preview="false"
            />
          </Col>
          <Col span={4}>
            <WrapperStyleImageSmall
              src={`http://localhost:3000/uploads/${product.image}`}
              alt="imageSmall"
              preview="false"
            />
          </Col>
          <Col span={4}>
            <WrapperStyleImageSmall
              src={`http://localhost:3000/uploads/${product.image}`}
              alt="imageSmall"
              preview="false"
            />
          </Col>
        </Row>
      </Col>
      <Col span={14} style={{ padding: "20px 0 35px 20px" }}>
        <WrapperStyleNameProduct>{product.name}</WrapperStyleNameProduct>
        <div>
          {/* Hiển thị số sao dựa trên rating */}
          {[...Array(5)].map((_, i) => (
            <StarFilled
              key={i}
              style={{
                fontSize: "10px",
                color: i < product.rating ? "#fac700" : "#ddd",
              }}
            />
          ))}
          <WrapperStyleTextSell>
            | Đã bán {product.sell || "100+"}+
          </WrapperStyleTextSell>
        </div>
        <WrapperPriceProduct>
          <WrapperPriceTextProduct>
            {product.price ? product.price.toLocaleString() : "N/A"}
          </WrapperPriceTextProduct>
        </WrapperPriceProduct>
        <WrapperAddresstProduct>
          <span>Đem Hàng Đến </span>
          <span className="address">{user.address}</span>
          <span className="change-address">Đổi điểm hẹn</span>
        </WrapperAddresstProduct>
        <div style={{ margin: "10px 0 20px", gap: "8px", display: "grid" }}>
          <div>Số Lượng: {product.countInStock} sản phẩm </div>
          <WrapperQualityProduct>
            <button style={{ border: "none", background: "transparent" }}>
              <MinusOutlined
                onClick={() => setQuantity(quantity - 1)}
                style={{ color: "#fa4f31", fontSize: "20px" }}
              />
            </button>
            <StyledInputNumber
              min={1}
              max={product.countInStock}
              value={quantity}
              onChange={handleInputChange}
              readOnly
            />
            <button style={{ border: "none", background: "transparent" }}>
              <PlusOutlined
                onClick={() => setQuantity(quantity + 1)}
                style={{ color: "#fa4f31", fontSize: "20px" }}
              />
            </button>
          </WrapperQualityProduct>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
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
            textButton={"Mua Ngay Đi"}
            styleTextButton={{ color: "#fff", fontSize: "14px" }}
          />
        </div>
      </Col>
    </Row>
  );
};

export default ProductDetailsComponent;
