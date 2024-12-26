import React, { useEffect, useState } from "react";
import NavBarComponent from "../../components/NavBarComponent/NavBarComponent";
import CardComponent from "../../components/CardComponent/CardComponent";
import { Col, Pagination, Row } from "antd";
import { WrapperNavBar, WrapperProducts } from "./style";
import * as ProductService from "../../services/ProductServices";
import { useParams, useNavigate } from "react-router-dom";

const TypeProductPage = () => {
  const { type } = useParams();
  const decodedType = decodeURIComponent(type); // "Nón"
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  const fetchProductType = async (decodedType) => {
    try {
      const result = await ProductService.getProductType(decodedType);
      if (result?.status === "OK" && Array.isArray(result.data)) {
        setProducts(result.data);
      } else {
        console.error("No products found or error occurred:", result?.message);
        setProducts([]);
      }
    } catch (error) {
      console.error("Fetch error:", error.message);
      setProducts([]);
    }
  };

  useEffect(() => {
    if (type) {
      const decodedType = decodeURIComponent(type);
      if (decodedType) {
        fetchProductType(decodedType);
      } else {
        console.error("Type không hợp lệ:", type);
      }
    }
  }, [type]);

  const handleShowDetails = (id) => {
    navigate(`/product-details/${id}`);
  };

  return (
    <div style={{ width: "100%", background: "#efefef", minHeight: "100%" }}>
      <div style={{ paddingLeft: "120px", margin: "0 auto" }}>
        <Row style={{ flexWrap: "nowrap", padding: "10px 0" }}>
          <WrapperNavBar span={4}>
            <NavBarComponent />
          </WrapperNavBar>
          <Col span={20}>
            <WrapperProducts>
              {products.length > 0 ? (
                products.map((product) =>
                  product._id ? (
                    <CardComponent
                      key={product._id}
                      id={product._id}
                      name={product.name}
                      image={product.image}
                      price={product.price}
                      brandType={product.brandType}
                      type={product.type}
                    />
                  ) : null
                )
              ) : (
                <p>Không có sản phẩm nào phù hợp.</p>
              )}
            </WrapperProducts>
            <Pagination
              defaultCurrent={1}
              total={products.length}
              style={{ justifyContent: "center", marginTop: "10px" }}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default TypeProductPage;
