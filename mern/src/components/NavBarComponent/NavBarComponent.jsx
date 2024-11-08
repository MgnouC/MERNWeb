import React from "react";
import { Checkbox, Rate } from "antd";
import {
  WrapperLableText,
  WrapperTextContent,
  WrapperTextValue,
} from "./style";

const NavBarComponent = () => {
  const onChange = () => {};

  const renderContent = (type, options) => {
    switch (type) {
      case "text":
        return options.map((option, index) => {
          return (
            <WrapperTextValue key={index}>
              {option}
            </WrapperTextValue>
          );
        });
      case "checkbox":
        return (
          <Checkbox.Group
            style={{    
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
            onChange={onChange}
          >
            {options.map((option, index) => {
              return (
                <Checkbox key={index} value={option.value}>
                  {option.label}
                </Checkbox>
              );
            })}
          </Checkbox.Group>
        );
      case "star":
        return options.map((option, index) => {
          return (
            <div key={index} style={{ display: "flex", alignItems: "center" }}>
              <Rate style={{ fontSize: "12px" }} disabled defaultValue={option} />
              <span style={{ paddingLeft: "5px" }}> Từ {option} sao</span>
            </div>
          );
        });
      case "price":
        return options.map((option, index) => {
          return (
            <div key={index} style={{ display: "flex" }}>
              <span
                style={{
                  padding: "5px",
                  borderRadius: "10px",
                  backgroundColor: "#efefef",
                  width: "fit-content",
                }}
              >
                {option}
              </span>
            </div>
          );
        });
      default:
        return null;
    }
  };

  return (
    <div>
      <WrapperLableText>Danh mục sản phẩm</WrapperLableText>
      <WrapperTextContent>
        {renderContent("text", [
          "TV",
          "Laptop",
          "Phone",
          "Tablet",
          "Headphone",
        ])}
      </WrapperTextContent>

      <WrapperLableText>Chọn theo tính năng</WrapperLableText>
      <WrapperTextContent>
        {renderContent("checkbox", [
          { value: "a", label: "Tính năng A" },
          { value: "b", label: "Tính năng B" },
        ])}
      </WrapperTextContent>

      <WrapperLableText>Đánh giá sao</WrapperLableText>
      <WrapperTextContent>
        {renderContent("star", [3, 4, 5])}
      </WrapperTextContent>

      <WrapperLableText>Mức giá</WrapperLableText>
      <WrapperTextContent>
        {renderContent("price", ["<50,000 VND", ">50,000 VND"])}
      </WrapperTextContent>
    </div>
  );
};

export default NavBarComponent;
