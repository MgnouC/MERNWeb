import { Card, Image } from "antd";
import { Meta } from "antd/es/list/Item";
import React from "react";
import {
  StyleNameProduct,
  WrapperDiscountText,
  WrapperReportText,
  WrapperPriceText,
  WrapperCardStyle,
  WrapperStyleTextSell,
} from "./style";
import { StarFilled } from "@ant-design/icons";
import logo from "../../assets/images/logo.png";
const CardComponent = (props) => {
  const { countInStock, description, image, name, price, sell, discount, rating } =
    props;
  return (
    <WrapperCardStyle
      hoverable
      styleheader={{ width: "100%", height: "100%", opacity: "1" }}
      style={{ width: 240 }}
      stylebody={{ padding: "10px" }}
      cover={
        <img
          alt="example"
          src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        />
      }
    >
      <StyleNameProduct>{name}</StyleNameProduct>
      <WrapperReportText>
        <span>
          <StarFilled
            style={{
              fontSize: "10px",
              color: "rgb(251, 195, 0)",
              paddingRight: "2px",
            }}
          />{" "}
          <span>{rating}</span>
          <WrapperStyleTextSell> | Đã bán {sell ||100}+</WrapperStyleTextSell>
        </span>
      </WrapperReportText>
      <WrapperPriceText style={{ boxSizing: "border-box" }}>
        <span style={{ marginRight: "5px" }}>{price} </span>
        <div style={{ display: "flex", gap: "4px", height: "18px" }}>
          <WrapperDiscountText>{discount || 5}%</WrapperDiscountText>
        </div>
      </WrapperPriceText>
    </WrapperCardStyle>
  );
};

export default CardComponent;
