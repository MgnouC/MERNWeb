import { Card } from "antd";
import styled from "styled-components";

export const WrapperCardStyle = styled(Card)`
    width: 100%
    & img { 
        width: 100%;
        height: 100%;
        opacity: 1;
    }
    position: 'relative'

`
export const StyleNameProduct = styled.div`
    font-weight: 400px;
    font-size: 14px;
    line-height: 150%;
    color: #333333;
    font-family: Helvatica;
`
export const WrapperReportText = styled.div`
    padding: 8px;
    font-size: 11px;
    color: rgb(128,128,137);
    display: flex;
    align-items: center;
`
export const WrapperPriceText = styled.div`
    text-align: left;
    font-size: 16px;
    line-height: 150%;
    font-weight: 600;
    color: rgb(255, 66, 78);
    margin: 0px;
    display: flex;
    align-items: center;
`
export const WrapperDiscountText = styled.div`
    display: flex;
    padding: 0px 4px;
    align-items: flex-start;
    border-radius: 8px;
    background: var(--Alias-Theme-Variant, #f5f5fa);
    color: var(--Alias-Primary---On-Theme, #27272a);
    font-family: Inter;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
`
export const WrapperStyleTextSell = styled.span`
    font-size: 14px;
    line-height: 24px;
    color: rgb(120, 120, 120);  
`