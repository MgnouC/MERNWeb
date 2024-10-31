import React, { useEffect, useState } from "react";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import {
  WrapperButtonMore,
  WrapperProducts,
  WrapperTypeProduct,
} from "./style";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import Slide1 from "../../assets/images/Slide1.webp";
import Slide2 from "../../assets/images/Slide2.webp";
import Slide3 from "../../assets/images/Slide3.webp";
import CardComponent from "../../components/CardComponent/CardComponent";
import { useSelector } from "react-redux";
import * as ProductService from "../../services/ProductServices";
import { useDebounce } from "../../hooks/useDebounce";

const HomePage = () => {
  const searchProduct = useSelector((state) => state?.product?.search); // Redux search term
  const [stateProduct, setStateProduct] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(4); // Số sản phẩm hiển thị ban đầu
  const searchDebounce = useDebounce(searchProduct, 1000);
  const arr = ["TV", "Laptop", "Phone", "Tablet", "Headphone"];

  useEffect(() => {
    const fetcProduct = async () => {
      try {
        // Fetch products based on search term
        const response =
          searchProduct?.length > 0
            ? await ProductService.getAllProduct(searchProduct) // Fetch based on search
            : await ProductService.getAllProduct(); // Fetch all if no search term

        // Ensure stateProduct is always an array
        setStateProduct(
          Array.isArray(response) ? response : response?.data || []
        );
      } catch (error) {
        console.error("Error fetching products:", error.message);
        setStateProduct([]); // Set to empty array on error
      }
    };

    fetcProduct();
  }, [searchDebounce]); // Refetch whenever search term changes

  // Hàm xử lý khi nhấn "Xem thêm"
  const handleLoadMore = () => {
    setVisibleProducts((prevVisible) => prevVisible + 8); // Tăng số lượng sản phẩm hiển thị thêm 8
  };

  return (
    <div style={{ width: "1270px", margin: "0 auto" }}>
      <WrapperTypeProduct>
        {arr.map((item) => (
          <TypeProduct name={item} key={item} />
        ))}
      </WrapperTypeProduct>
      <div className="body" style={{ width: "100%" }}>
        <div
          id="container"
          style={{
            backgroundColor: "#fff",
            padding: "0px 120px",
            height: "1000px",
            margin: "0 auto",
          }}
        >
          <SliderComponent arrImages={[Slide1, Slide2, Slide3]} />
          <WrapperProducts>
            {/* Hiển thị số sản phẩm dựa trên visibleProducts */}
            {stateProduct.slice(0, visibleProducts).map((product) => (
              <CardComponent
                key={product._id}
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
          {/* Kiểm tra nếu còn sản phẩm chưa hiển thị thì hiển thị nút "Xem thêm" */}
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
                onClick={handleLoadMore} // Gọi hàm khi nhấn
                textButton="Xem thêm"
                type="outline"
                styleButton={{
                  border: "1px solid rgb(250, 79, 49)",
                  width: "240px",
                  height: "40px",
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
