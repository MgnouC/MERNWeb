import { Card } from "antd";
import styled from "styled-components";

export const WrapperCardStyle = styled(Card)`
    width: 100%;
    position: relative;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    }

    & img { 
        width: 100%;
        height: 200px;
        object-fit: cover;
        transition: opacity 0.3s ease;
    }
`;

export const StyleNameProduct = styled.div`
    font-weight: 500;
    font-size: 16px;
    line-height: 1.5;
    color: #333333;
    font-family: Helvetica, Arial, sans-serif;
    margin: 12px 0 4px 0;
`;

export const WrapperReportText = styled.div`
    padding: 8px 0;
    font-size: 12px;
    color: #808089;
    display: flex;
    align-items: center;
    gap: 4px;

    /* Optional: Add an icon or indicator */
    &::before {
        content: "•";
        color: #808089;
        margin-right: 4px;
    }
`;

export const WrapperPriceText = styled.div`
    text-align: left;
    font-size: 18px;
    line-height: 1.5;
    font-weight: 600;
    color: #FF424E;
    margin: 8px 0;
    display: flex;
    align-items: center;

    /* Optional: Add currency symbol styling */
    &::before {
        content: "$";
        font-size: 14px;
        margin-right: 2px;
    }
`;

export const WrapperDiscountText = styled.div`
    display: inline-flex;
    padding: 4px 8px;
    align-items: center;
    border-radius: 8px;
    background: #f5f5fa;
    color: #27272a;
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    font-weight: 500;
    line-height: 1.5;
    margin-top: 4px;

    /* Optional: Add discount icon */
    &::before {
        content: "-";
        margin-right: 4px;
        color: #ee4d2d;
    }
`;

export const WrapperStyleTextSell = styled.span`
    font-size: 14px;
    line-height: 24px;
    color: #787878;
    display: block;
    margin-top: 4px;
`;
