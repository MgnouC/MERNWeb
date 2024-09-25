import React from 'react'
import ProductDetailsComponent from '../../components/ProductDetailsComponent/ProductDetailsComponent'

const ProductDetailsPage = () => {
  return (
      <div 
        style={{
        padding: '0 120px', 
        background: 'rgb(245, 245, 249)',
      }}>
          <h5>Trang Chủ</h5>
            <ProductDetailsComponent/>

      </div>
  )  
}

export default ProductDetailsPage