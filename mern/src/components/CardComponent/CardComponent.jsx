import { Card, Image } from 'antd'
import { Meta } from 'antd/es/list/Item'
import React from 'react'
import { StyleNameProduct, WrapperDiscountText, WrapperReportText, WrapperPriceText, WrapperCardStyle, WrapperStyleTextSell } from './style'
import { StarFilled } from '@ant-design/icons'
import logo from '../../assets/images/logo.png'
const CardComponent = () => {
  return (
    <WrapperCardStyle
        hoverable
        styleHeader ={{  width: '100%', height: '100%', opacity: '1' }}
        style={{ width: 240 }}
        styleBody = {{padding: '10px', }}
        cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
    >
        <StyleNameProduct>IPhone</StyleNameProduct>
        <WrapperReportText>
          <span>
            <StarFilled style={{fontSize: '10px', color: "rgb(251, 195, 0)", paddingRight: '2px'}} /> <span>4.96/5</span>
            <WrapperStyleTextSell> | Đã bán 100+</WrapperStyleTextSell>
          </span>
        </WrapperReportText>
          <WrapperPriceText style={{boxSizing: "border-box"}}>
            1.000.000d
          <div style={{display: "flex", gap: '4px' ,height: '18px'}}>
            <WrapperDiscountText>
              -5%
            </WrapperDiscountText>
          </div> 
          </WrapperPriceText>
       
    </WrapperCardStyle>  )    
}

export default CardComponent