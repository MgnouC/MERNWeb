import React from 'react'
import { Col } from "antd"
import { WrapperHeader, WrapperHeaderAccount, WrapperTextHeader, WrapperTextHeaderSmall } from './styled'
import Search from 'antd/es/transfer/search'
import { CaretDownOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';

const HeaderComponent = () => {
  return (
    <div>
      <WrapperHeader gutter =  {[16]}>

        <Col span={6}>
          <WrapperTextHeader>SELLSOME</WrapperTextHeader>
        </Col>

        <Col span={12} > 
          <ButtonInputSearch 
            size ="large"
            textButton = "Tìm kiếm"
            bordered = {false}
            placeholder ="Nhập sản phẩm cần tìm"/>
        </Col>

        <Col span={6} style = {{ display : 'flex', gap : '20px'}} >
          <WrapperHeaderAccount>
          <UserOutlined style={{fontSize :'30px' }}  />
            <div>
              <WrapperTextHeaderSmall>Đăng nhập/Đăng ký</WrapperTextHeaderSmall>
              <div>
                <WrapperTextHeaderSmall>Tài Khoản</WrapperTextHeaderSmall>
                <CaretDownOutlined />
              </div>
            </div>
          </WrapperHeaderAccount> 
          <div>
                <ShoppingCartOutlined style={{fontSize :'30px', color: '#ededed', padding: '0 px 5px' }}/>
                <WrapperTextHeaderSmall>Giỏ Hàng</WrapperTextHeaderSmall>
          </div>
        </Col>
      </WrapperHeader>
    </div>
  )
}

export default HeaderComponent
