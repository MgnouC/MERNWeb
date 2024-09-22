import { Card } from 'antd'
import { Meta } from 'antd/es/list/Item'
import React from 'react'
import { StyleNameProduct, WrapperReportText } from './style'
import { StarFilled } from '@ant-design/icons'

const CardComponent = () => {
  return (
    <Card
        hoverable
        style={{ width: 240 }}
        styleBody = {{padding: '10px', }}
        cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
    >
        <StyleNameProduct>IPhone</StyleNameProduct>
        <WrapperReportText>
            <StarFilled style={{fontSize: '10px', color: "rgb(251, 195, 0)", paddingRight: '2px'}} /> <span>4.96/5</span>
        </WrapperReportText>

  </Card>  )    
}

export default CardComponent