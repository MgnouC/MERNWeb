import React, { useState, useEffect } from "react";
import { Checkbox, Rate } from "antd";
import * as ProductService from "../../services/ProductServices";
import {
  WrapperLabelText,
  WrapperTextContent,
  WrapperTextValue,
  StyledCheckboxGroup,
  StyledRate,
  StyledPriceTag,
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
        return options.map((option, index) => (
          <WrapperTextValue key={index}>
            <a href={`/products/${option}`} style={{ textDecoration: 'none' }}>
              {option}
            </a>
          </WrapperTextValue>
        ));
      case "checkbox":
        return (
          <StyledCheckboxGroup>
            {options.map((option, index) => (
              <Checkbox key={index} value={option.value}>
                {option.label}
              </Checkbox>
            ))}
          </StyledCheckboxGroup>
        );
      case "star":
        return (
          <StyledRate>
            {options.map((option, index) => (
              <div key={index}>
                <Rate disabled defaultValue={option} />
                <span>Từ {option} sao</span>
              </div>
            ))}
          </StyledRate>
        );
      case "price":
        return (
          <StyledPriceTag>
            {options.map((option, index) => (
              <span key={index}>{option}</span>
            ))}
          </StyledPriceTag>
        );
      default:
        return null;
    }
  };


  return (
    <div>
      <WrapperLabelText>Danh mục sản phẩm</WrapperLabelText>
      <WrapperTextContent>
        {renderContent("text", typeProducts)}
      </WrapperTextContent>

      {/* Các phần khác giữ nguyên */}
      <WrapperLabelText>Chọn theo tính năng</WrapperLabelText>
      <WrapperTextContent>
        {renderContent("checkbox", [
          { value: "a", label: "Tính năng A" },
          { value: "b", label: "Tính năng B" },
        ])}
      </WrapperTextContent>

      <WrapperLabelText>Đánh giá sao</WrapperLabelText>
      <WrapperTextContent>
        {renderContent("star", [3, 4, 5])}
      </WrapperTextContent>

      <WrapperLabelText>Mức giá</WrapperLabelText>
      <WrapperTextContent>
        {renderContent("price", ["<50,000 VND", ">50,000 VND"])}
      </WrapperTextContent>
    </div>
  );
};

export default NavBarComponent;
