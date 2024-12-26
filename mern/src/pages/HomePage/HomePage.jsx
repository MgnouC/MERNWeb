import React, { useEffect, useState } from "react";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import { WrapperButtonMore, WrapperProducts, WrapperTypeProduct } from "./style";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import Slide1 from "../../assets/images/Slide1.webp";
import Slide2 from "../../assets/images/Slide2.webp";
import Slide3 from "../../assets/images/Slide3.webp";
import CardComponent from "../../components/CardComponent/CardComponent";
import { useSelector } from "react-redux";
import * as ProductService from "../../services/ProductServices";
import { useDebounce } from "../../hooks/useDebounce";

const HomePage = () => {
  const searchProduct = useSelector((state) => state?.product?.search);
  const searchDebounce = useDebounce(searchProduct, 1000);

  const [stateProduct, setStateProduct] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(4);
  const [typeProducts, setTypeProducts] = useState([]);

  const fetchAllTypeProduct = async () => {
    try {
      const response = await ProductService.getAllType();
      // Nếu API trả về { data: [...] } thì response.data là mảng các type
      setTypeProducts(response?.data || []);
    } catch (error) {
      console.error("Error fetching all type product:", error.message);
      setTypeProducts([]);
    }
  };

  const fetchProducts = async (query) => {
    try {
      const response = query?.length > 0
        ? await ProductService.getAllProduct(query)
        : await ProductService.getAllProduct();

      // Nếu API trả về { data: [...] } thì response.data là mảng sản phẩm
      setStateProduct(Array.isArray(response?.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching products:", error.message);
      setStateProduct([]);
    }
  };

  useEffect(() => {
    fetchAllTypeProduct();
  }, []);

  useEffect(() => {
    fetchProducts(searchDebounce);
  }, [searchDebounce]);

  const handleLoadMore = () => {
    setVisibleProducts((prev) => prev + 4);
  };

  return (
    <div style={{ width: "1270px", margin: "0 auto" }}>
      <WrapperTypeProduct>
        {typeProducts.map((item) => (
          <TypeProduct name={item} key={item} />
        ))}
      </WrapperTypeProduct>
      <div className="body" style={{ width: "100%" }}>
        <div
          id="container"
          style={{
            backgroundColor: "#fff",
            padding: "0px 120px 10px 120px",
            minHeight: "1000px",
            margin: "0 auto",
          }}
        >
          <SliderComponent arrImages={[Slide1, Slide2, Slide3]} />
          <WrapperProducts>
            {stateProduct.slice(0, visibleProducts).map((product) => (
              <CardComponent
                key={product._id}
                id={product._id}
                countInStock={product.countInStock}
                description={product.description}
                name={product.name}
                image={product.image}
                price={product.price}
                rating={product.rating}
                type={product.type}
                sell={product.sell}
                discount={product.discount}
              />
            ))}
          </WrapperProducts>

          {visibleProducts < stateProduct.length && (
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "10px",
              }}
            >
              <WrapperButtonMore
                onClick={handleLoadMore}
                textButton="Xem thêm"
                type="outline"
                styleButton={{
                  border: "1px solid rgb(250, 79, 49)",
                  width: "240px",
                  marginTop: "12px",
                  padding: "8px 12px",
                  borderRadius: "4px",
                  color: "rgb(250, 79, 49)",
                  fontSize: "16px",
                  lineHeight: "150%",
                  textAlign: "center",
                  cursor: "pointer",
                }}
                styleTextButton={{ fontWeight: "500" }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
