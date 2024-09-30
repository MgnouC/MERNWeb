import { Col, Image, InputNumber } from "antd";
import styled from "styled-components";

export const WrapperStyleImageSmall = styled(Image)`
    width: 100px;
    height:100px;
`
export const WrapperStyleColImage = styled(Col)`
    flex-basic: unset;

`
export const WrapperStyleNameProduct = styled.h1`
    margin: 0px;
    color: rgb(39, 39, 42);
    font-size: 20px;
    font-weight: 500;
    line-height: 150%;
    word-break: break-word;
    white-space: break-spaces;
`

export const WrapperStyleTextSell = styled.span`
    font-size: 14px;
    line-height: 24px;
    color: rgb(120, 120, 120);  
`
export const WrapperPriceProduct  = styled.div`
    background: rgb(250, 250, 250);
    border-radius: 4px;
`

export const WrapperPriceTextProduct = styled.h1`
    background: #fff;
    font-size: 32px;
    line-height: 40px;
    font-weight: 500;
    margin-right: 8px;
    paddingL 10px;
    margin-top: 10px;
`
export const WrapperAddresstProduct = styled.div`
   span.address { 
        text-decoration: underline;
        font-size: 15px;
        line-height: 24px;
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow:  ellipsis;
    };
    span.change-address{ 
        color: rgb(11, 116, 229);
        font-size: 16px;
        font-weight: 500;
        line-height: 150%;    
    }
`

export const WrapperQualityProduct = styled.div`
    display : flex;
    gap: 4px;
    align-items: center;
    border-radius: 4px;
    max-width: 100px;
    border: 1px solid rgb(166, 166, 176)
`

export const WrapperInputNumber = styled(InputNumber)`
`

