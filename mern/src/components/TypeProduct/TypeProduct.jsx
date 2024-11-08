import React from "react";
import { useNavigate } from "react-router-dom";

const TypeProduct = ({ name }) => {
  const navigate = useNavigate();

  const handleNavigateType = (type) => {
    if (!type) {
      console.error("Loại sản phẩm không hợp lệ!");
      alert("Loại sản phẩm không hợp lệ!"); // Hiển thị thông báo cho người dùng
      return;
    }

    // Tạo URL thân thiện
    const encodedType = encodeURIComponent(
      type
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/_/g, " ")
    );
    navigate(`/products/${encodedType}`);
  };

  return (
    <div
      style={{ padding: "0 10px", cursor: "pointer" }}
      onClick={() => handleNavigateType(name)}
    >
      {name}
    </div>
  );
};

export default TypeProduct;
