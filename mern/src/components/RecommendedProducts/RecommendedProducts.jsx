import React from "react";

const RecommendedProducts = ({ products, title }) => {
  return (
    <div className="recommended-section">
      <h2>{title}</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.price} $</p>
            <button>Thêm vào giỏ hàng</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedProducts;
