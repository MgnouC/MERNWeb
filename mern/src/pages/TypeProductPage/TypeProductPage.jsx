import React, { Fragment } from 'react'
import NavBarComponent from '../../components/NavBarComponent/NavBarComponent'
import CardComponent from '../../components/CardComponent/CardComponent'
import {Col, Pagination, Row } from 'antd'
import { WrapperNavBar, WrapperProducts } from './style'

const TypeProductPage = () => {
    const onChange =  () => {}
    return (
        <div style = {{padding: '10px 120px',background: "#efefef"}}>
            <Row style={{ flexWrap: 'nowrap'}}>
            <WrapperNavBar span={4} >
                <NavBarComponent/>
            </WrapperNavBar>
            <Col span={20} >
            <WrapperProducts >
                <CardComponent/>
                <CardComponent/>
                <CardComponent/>
                <CardComponent/>
                <CardComponent/>
                <CardComponent/>
                <CardComponent/>
                <CardComponent/>
            </WrapperProducts>
            <Pagination  defaultCurrent={2} total={100} onChange={onChange} style={{justifyContent: "center", marginTop : '10px'}}/>
            </Col>
            </Row>
        </div>
)
}

export default TypeProductPage