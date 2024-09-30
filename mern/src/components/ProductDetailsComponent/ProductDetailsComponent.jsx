import { Col, Grid, Image, InputNumber, Row } from 'antd'
import React from 'react'
import imageProduct from '../../assets/images/cafe.webp'
import imageProductSmall from '../../assets/images/cafe2.webp'
import { WrapperAddresstProduct, WrapperBtnQualityProduct, WrapperPriceProduct, WrapperPriceTextProduct, WrapperQualityProduct, WrapperStyleImageSmall, WrapperStyleNameProduct, WrapperStyleTextSell } from './style'
import { MinusOutlined, PlusOutlined, StarFilled } from '@ant-design/icons'
import ButtonComponent from '../ButtonComponent/ButtonComponent'

const ProductDetailsComponent = () => {
    const onChange =() => {}
    return (
    <Row style = {{padding: '15px' ,background: '#fff'}}> 
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
        <Col span={14} style={{padding: '20px 0 35px 20px'}}>
            <WrapperStyleNameProduct>Trung Nguyên Legend - Cà phê hoà tan rang xay Cappuccino Hazelnut - Hộp 12 gói x 18gr</WrapperStyleNameProduct>
            <div>
                <StarFilled style={{fontSize: '10px', color: "#fac700"}} />
                <StarFilled style={{fontSize: '10px', color: "rgb(251, 195, 0)"}} />
                <StarFilled style={{fontSize: '10px', color: "rgb(251, 195, 0)"}} />
                <WrapperStyleTextSell>| Đã bán 100+</WrapperStyleTextSell>

            </div>
            <WrapperPriceProduct>
                <WrapperPriceTextProduct>5.000.000</WrapperPriceTextProduct>
            </WrapperPriceProduct>
            <WrapperAddresstProduct>
                <span>Đem Hàng Đến </span>
                <span className = 'address'>Q. 1, P. Bến Nghé, Hồ Chí Minh</span>
                <span className = 'change-address'>Đổi điểm hẹn</span>
            </WrapperAddresstProduct>
            <div style={{ margin : '10px 0 20px', gap: '8px', display: 'grid'}}>
                <div >Số Lượng</div>
                <WrapperQualityProduct>
                    <button style = {{ border :'none', background : 'transparent'}}>
                        <MinusOutlined style={{color: '#fa4f31',fontSize: '20px'}}/>
                    </button>
                    <InputNumber min={1} max={10} defaultValue={1} onChange={onChange} 
                        style={{ weight: '60px', borderTop: 'none', borderBottom: 'none'}} />
                    <button style = {{ border :'none', background : 'transparent'}}>
                        <PlusOutlined style={{color: '#fa4f31',fontSize: '20px'}}/>
                    </button>
                </WrapperQualityProduct>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', }}>
                    <ButtonComponent
                        size = {40} 
                        styleButton={{
                            padding  : '0 20px',
                            background: '#ffeee7',
                            height: '48px',
                            width: '250px',
                            border: '1px solid #ee4d2d',
                            borderRadius:  '2px',
                            boxShadow: '0 1px 1px 0 rgba(0, 0, 0, .09)',
                        }} 
                        textButton={'Bỏ Vào Giỏ Hàng'} 
                        styleTextButton={{color: '#ee4d2d', fontSize: '14px'}}>
                    </ButtonComponent>
                <ButtonComponent
                    border= {false}
                    size = {40} 
                    styleButton={{
                        padding  : '0 20px',
                        background: '#ee4d2d',
                        height: '48px',
                        width: '250px',
                        border: 'none',
                        borderRadius:  '2px',
                        boxShadow: '0 1px 1px 0 rgba(0, 0, 0, .09)',
                    }} 
                    textButton={'Mua Ngay Đi'} 
                    styleTextButton={{color: '#fff', fontSize: '14px'}}>
                </ButtonComponent>

            </div>
        </Col>
    </Row>
  )
}

export default ProductDetailsComponent