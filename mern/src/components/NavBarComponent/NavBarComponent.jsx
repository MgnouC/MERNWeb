import React, { useState, useEffect } from "react";
import { Checkbox, Rate } from "antd";
import { useQuery } from "@tanstack/react-query";
import * as ProductService from "../../services/ProductServices";
import {
  WrapperLableText,
  WrapperTextContent,
  WrapperTextValue,
} from "./style";

const NavBarComponent = () => {
  const onChange = () => {};
  const [typeProducts, setTypeProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchAllTypeProduct = async () => {
    try {
      const response = await ProductService.getAllType(); // Fetch all type product
      console.log(response);
      if (!response) {
        throw { message: "All type product not found", status: 400 };
      }
      setTypeProducts(response?.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching all type product:", error.message);
      setIsError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllTypeProduct();
  }, []);

  if (isLoading) {
    return <div>Đang tải danh mục sản phẩm...</div>;
  }

  if (isError) {
    return <div>Lỗi khi tải danh mục sản phẩm. Vui lòng thử lại sau.</div>;
  }

  const renderContent = (type, options) => {
    switch (type) {
      case "text":
        return options.map((option, index) => {
          return (
            <WrapperTextValue key={index} >
              <a style={{ color: "#fa4f31", fontWeight: 500 }} href={`/products/${option}`}>{option}</a>
            </WrapperTextValue>
          );
        });
        // case "text":
        //   return options.map((option, index) => {
        //     return (
        //       <WrapperTextValue key={index}>
        //         <a href={`/products?type=${option.slug}`}>{option.name}</a>
        //       </WrapperTextValue>
        //     );
        //   });
        
      case "checkbox":
        return (
          <Checkbox.Group
            style={{
              width: "100%",
              height: "100%",
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
              <Rate
                style={{ fontSize: "12px" }}
                disabled
                defaultValue={option}
              />
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
        {renderContent("text", typeProducts)}
      </WrapperTextContent>

      {/* Các phần khác giữ nguyên */}
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
