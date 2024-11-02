import React from "react";
import ProductDetailsComponent from "../../components/ProductDetailsComponent/ProductDetailsComponent";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <div
      style={{
        padding: "0 120px",
        background: "rgb(245, 245, 249)",
      }}
    >
      <h5 style = {{ fontSize: "20px", weight: "500" }}> <span style = {{ cursor: "pointer", color: "rgb(250, 79, 49)" }} onClick={() => {navigate('/')}}>Trang Chủ</span> - Chi Tiết Sản Phẩm</h5>
      <ProductDetailsComponent idProduct={id} />
    </div>
  );
};

export default ProductDetailsPage;
