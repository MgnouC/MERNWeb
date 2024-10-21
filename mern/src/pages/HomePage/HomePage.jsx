import React from "react";
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
import NavBarComponent from "../../components/NavBarComponent/NavBarComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useQuery } from "@tanstack/react-query";
import * as ProductService from "../../services/ProductServices";

const HomePage = () => {
  const arr = ["TV", "Laptop", "Phone", "Tablet", "Headphone"];
  const fetchProductAll = async () => {
    const res = await ProductService.getAllProduct();
    return res;
    console.log("res", res);
  };
  const { data: products } = useQuery({
    queryKey: "products",
    queryFn: fetchProductAll,
    retry: 3,
    retryDelay: 1000,
  });
  console.log("data", products);
  return (
    <>
      <div style={{ width: "1270px", margin: "0 auto" }}>
        <WrapperTypeProduct>
          {arr.map((Item) => {
            return <TypeProduct name={Item} key={Item} />;
          })}
        </WrapperTypeProduct>
        <div className="body" style={{ width: "100%" }}>
          <div
            id="container"
            style={{
              backgroundColor: "efefef",
              padding: "0px 120px",
              height: "1000px",
              margin: "0 auto",
            }}
          >
            <SliderComponent arrImages={[Slide1, Slide2, Slide3]} />
            <WrapperProducts>
              {products?.data?.map((products) => {
                return (
                  <CardComponent
                    key={products._id}
                    //product={products}
                    countInStock={products.countInStock}
                    description={products.description}
                    name={products.name}
                    image={products.image}
                    price={products.price}
                    rating={products.rating}
                    type={products.type}
                    sell = {products.sell}
                    discount = {products.discount}
                  />
                );
              })}
            </WrapperProducts>
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
                textButton="Xem thêm"
                type="outline"
                styleButton={{
                  border: "1px solid rgb(10, 104, 255)",
                  width: "240px",
                  height: "40px",
                  marginTop: "12px",
                  padding: "8px 12px",
                  borderRadius: "4px",
                  color: "rgb(10, 104, 255)",
                  fontSize: "16px",
                  lineHeight: "150%",
                  textAlign: "center",
                }}
                styleTextButton={{ fontWeight: "500" }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
