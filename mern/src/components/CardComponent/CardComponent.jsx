import { Card, Image } from "antd";
import { StarFilled } from "@ant-design/icons";
import React from "react";
import {
  StyleNameProduct,
  WrapperDiscountText,
  WrapperReportText,
  WrapperPriceText,
  WrapperCardStyle,
  WrapperStyleTextSell,
} from "./style";
import { useNavigate } from "react-router-dom";

const CardComponent = (props) => {
  const navigate = useNavigate();

  const {
    countInStock,
    description,
    image,
    name,
    price,
    sell,
    discount,
    rating,
    id,
    brandType,
  } = props;

  const handleDetailProduct = (productId) => {
    // Chuyển hướng đến trang chi tiết sản phẩm
    navigate(`/product-details/${productId}`);
  };

  return (
    <WrapperCardStyle
      hoverable
      styleheader={{ width: "100%", height: "100%", opacity: "1" }}
      style={{ width: 240 }}
      stylebody={{ padding: "10px" }}
      cover={
        <img
          style={{ height: "220px", width: "100%" }}
          alt={name}
          src={`http://localhost:3000/uploads/${image}`}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/path/to/placeholder-image.png"; // Hình ảnh thay thế
          }}
        />
      }
      // Khi click vào card sẽ gọi handleDetailProduct
      onClick={() => handleDetailProduct(id)}
    >
      <StyleNameProduct>{name}</StyleNameProduct>
      <WrapperReportText>
        <span>
          <WrapperStyleTextSell>
            <StarFilled
              style={{
                fontSize: "10px",
                color: "rgb(251, 195, 0)",
                paddingRight: "2px",
              }}
            />{" "}
            <span>{rating}</span> | Đã bán {sell || 100}+
          </WrapperStyleTextSell>
        </span>
      </WrapperReportText>
      <WrapperPriceText style={{ boxSizing: "border-box" }}>
        <span style={{ marginRight: "5px" }}>{price}</span>
        <div style={{ display: "flex", gap: "4px", height: "18px" }}>
          <WrapperDiscountText>{discount || 5}%</WrapperDiscountText>
        </div>
      </WrapperPriceText>
    </WrapperCardStyle>
  );
};

export default CardComponent;
