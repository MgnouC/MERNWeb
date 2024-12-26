import React, { useEffect, useState } from "react";
import ProductDetailsComponent from "../../components/ProductDetailsComponent/ProductDetailsComponent";
import { useParams, useNavigate } from "react-router-dom";
import * as ProductService from "../../services/ProductServices";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await ProductService.getDetailsProduct(id);
        console.log('res', res)
        // Kiểm tra cấu trúc dữ liệu
        // res.data.data là một mảng chứa sản phẩm
        if (res && res.data && Array.isArray(res.data) && res.data.length > 0) {
          setProduct(res.data[0]);
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error(error);
        setProduct(null);
      }
    };
    fetchProduct();
  }, [id]);

  //console.log('product', product);

  return (
    <div
      style={{
        padding: "0 120px",
        background: "rgb(245, 245, 249)",
      }}
    >
      {product ? (
        <h5 style={{ fontSize: "20px", fontWeight: "500" }}>
          <span
            style={{ cursor: "pointer", color: "rgb(250, 79, 49)" }}
            onClick={() => navigate("/")}
          >
            Trang Chủ
          </span>
          {product.type && ` - ${product.type}`}{" "}
          {product.brandType && ` - ${product.brandType}`} {" - "}
          {product.name}
        </h5>
      ) : (
        <h5 style={{ fontSize: "20px", fontWeight: "500" }}>
          <span
            style={{ cursor: "pointer", color: "rgb(250, 79, 49)" }}
            onClick={() => navigate("/")}
          >
            Trang Chủ
          </span>
          {" - Không tìm thấy sản phẩm"}
        </h5>
      )}
      <ProductDetailsComponent idProduct={id} />
    </div>
  );
};

export default ProductDetailsPage;
