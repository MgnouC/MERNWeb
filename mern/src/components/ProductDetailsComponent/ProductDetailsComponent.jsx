import { Col, Image, Row } from 'antd'
import React from 'react'
import imageProduct from '../../assets/images/cafe.webp'
import imageProductSmall from '../../assets/images/cafe2.webp'
import { WrapperStyleImageSmall } from './style'

const ProductDetailsComponent = () => {
  return (
    <Row style = {{padding: '16px' ,background: '#ffffff'}}> 
        <Col span={10}>
            <Image src ={imageProduct} alt = "image" preview=  {false} style = {{width: '100%', height: '100%'}} />

            <Row style={{ display: 'flex', paddingTop: '10px', justifyContent: 'space-between'}}>
                <Col span = {4}>
                    <WrapperStyleImageSmall src ={imageProductSmall} alt=  "imageSmall" preview= "false" />
                </Col>
                <Col span = {4}>
                    <WrapperStyleImageSmall src ={imageProductSmall} alt=  "imageSmall" preview= "false" />
                </Col>
                <Col span = {4}>
                    <WrapperStyleImageSmall src ={imageProductSmall} alt=  "imageSmall" preview= "false" />
                </Col>
                <Col span = {4}>
                    <WrapperStyleImageSmall src ={imageProductSmall} alt=  "imageSmall" preview= "false" />
                </Col>
                <Col span = {4}>
                    <WrapperStyleImageSmall src ={imageProductSmall} alt=  "imageSmall" preview= "false" />
                </Col>

            </Row>
        </Col>
        <Col span={14}></Col>

    </Row>
  )
}

export default ProductDetailsComponent