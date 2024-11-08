import React, { useEffect, useState } from "react";
import NavBarComponent from "../../components/NavBarComponent/NavBarComponent";
import CardComponent from "../../components/CardComponent/CardComponent";
import { Col, Pagination, Row } from "antd";
import { WrapperNavBar, WrapperProducts } from "./style";
import * as ProductService from "../../services/ProductServices";
import { useParams } from "react-router-dom";

const TypeProductPage = () => {
  const { type } = useParams(); // Lấy giá trị type từ URL
  const [products, setProducts] = useState([]);

  const fetchProductType = async (type) => {
    try {
      const result = await ProductService.getProductType(type);
      if (result && result.status === "OK") {
        console.log("Products with type:", type, result.data);
        setProducts(result.data);
      } else {
        console.error("No products found or error occurred:", result?.message);
      }
    } catch (error) {
      console.error("Fetch error:", error.message);
    }
  };

  useEffect(() => {
    if (type) {
      console.log("Type từ useParams:", type);
      const decodedType = decodeURIComponent(type);
      console.log("Type sau khi decode:", decodedType);
      
      if (decodedType) {
        fetchProductType(decodedType);
      } else {
        console.error("Type không hợp lệ:", type);
      }
    }
  }, [type]);

  return (
    <div style={{ width: "100%", background: "#efefef" }}>
      <div style={{ paddingLeft: "120px", margin: "0 auto" }}>
        <Row style={{ flexWrap: "nowrap", paddingTop: "10px" }}>
          <WrapperNavBar span={4}>
            <NavBarComponent />
          </WrapperNavBar>
          <Col span={20}>
            <WrapperProducts>
              {products.length > 0 ? (
                products.map((product) => (
                  <CardComponent
                    key={product._id}
                    name={product.name}
                    image={product.image}
                    price={product.price}
                    type={product.type}
                  />
                ))
              ) : (
                <p>Không có sản phẩm nào phù hợp với loại sản phẩm được chọn.</p>
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
