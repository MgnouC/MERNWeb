import { Col, Image, InputNumber } from "antd";
import styled from "styled-components";

/* Wrapper for Small Images */
export const WrapperStyleImageSmall = styled(Image)`
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;

    &:hover {
        transform: scale(1.05);
    }

    @media (max-width: 768px) {
        width: 80px;
        height: 80px;
    }
`;

/* Wrapper for Image Column */
export const WrapperStyleColImage = styled(Col)`
    flex: none;
    padding: 8px;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        padding: 6px;
    }
`;

/* Product Name */
export const WrapperStyleNameProduct = styled.h1`
   
    margin: 0;
    color: #27272a;
    font-size: 36px;
    font-weight: 500;
    line-height: 1.5;
    word-break: break-word;
    white-space: normal;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;

    @media (max-width: 768px) {
        font-size: 18px;
    }

    @media (max-width: 480px) {
        font-size: 16px;
    }
`;

/* Sell Text */
export const WrapperStyleTextSell = styled.span`
    display: block;
    margin-top: 4px;
    font-size: 14px;
    line-height: 1.714;
    color: #787878;

    @media (max-width: 768px) {
        font-size: 13px;
    }

    @media (max-width: 480px) {
        font-size: 12px;
    }
`;

/* Price Product Container */
export const WrapperPriceProduct = styled.div`
    background: #fafafa;
    border-radius: 8px;
    padding: 16px;
    display: flex;
    align-items: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    margin-top: 16px;

    @media (max-width: 768px) {
        padding: 12px;
        margin-top: 12px;
    }

    @media (max-width: 480px) {
        flex-direction: column;
        align-items: flex-start;
    }
`;

/* Price Text */
export const WrapperPriceTextProduct = styled.h1`
    color: #ee4d2d;
    background: #ffffff;
    font-size: 32px;
    line-height: 40px;
    font-weight: 500;
    margin-right: 8px;
    padding-left: 10px;
    margin-top: 10px;
    border-radius: 4px;

    @media (max-width: 768px) {
        font-size: 28px;
        line-height: 36px;
        margin-right: 6px;
        padding-left: 8px;
        margin-top: 8px;
    }

    @media (max-width: 480px) {
        font-size: 24px;
        line-height: 32px;
        margin-right: 0;
        padding-left: 0;
        margin-top: 0;
    }
`;

/* Address and Change Address */
export const WrapperAddresstProduct = styled.div`
    margin-top: 16px;
    display: flex;
    align-items: center;
    gap: 8px;

    span.address { 
        text-decoration: underline;
        font-size: 15px;
        line-height: 24px;
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 200px;

        @media (max-width: 768px) {
            max-width: 150px;
            font-size: 14px;
        }

        @media (max-width: 480px) {
            max-width: 120px;
            font-size: 13px;
        }
    }

    span.change-address { 
        color: #0b74e5;
        font-size: 16px;
        font-weight: 500;
        line-height: 1.5;
        cursor: pointer;

        &:hover {
            text-decoration: underline;
        }

        @media (max-width: 768px) {
            font-size: 15px;
        }

        @media (max-width: 480px) {
            font-size: 14px;
        }
    }

    @media (max-width: 480px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 4px;
    }
`;

/* Quantity Selector */
export const WrapperQualityProduct = styled.div`
    display: flex;
    gap: 8px;
    align-items: center;
    border-radius: 4px;
    max-width: 120px;
    border: 1px solid #a6a6b0;
    padding: 4px 8px;
    background-color: #ffffff;
    transition: border-color 0.3s ease;

    &:hover {
        border-color: #ee4d2d;
    }

    @media (max-width: 768px) {
        max-width: 100px;
        gap: 6px;
        padding: 3px 6px;
    }

    @media (max-width: 480px) {
        max-width: 80px;
        gap: 4px;
        padding: 2px 4px;
    }
`;

/* Input Number for Quantity */
export const WrapperInputNumber = styled(InputNumber)`
    width: 60px;
    border: none;
    font-size: 16px;
    text-align: center;
    background-color: #f5f5f5;
    border-radius: 4px;
    padding: 4px 0;
    transition: background-color 0.3s ease;

    .ant-input-number-handler-wrap {
        display: none;
    }

    &:focus {
        box-shadow: none;
        border: none;
        background-color: #eaeaea;
    }

    @media (max-width: 768px) {
        width: 50px;
        font-size: 14px;
        padding: 3px 0;
    }

    @media (max-width: 480px) {
        width: 40px;
        font-size: 12px;
        padding: 2px 0;
    }
`;
export const StyledInputNumber = styled(InputNumber)`
  width: 60px;
  border-top: none;
  border-bottom: 1px solid #ccc;
  text-align: center;
  font-size: 14px;

  &:focus {
    border-color: #f95230;
    box-shadow: none;
  }

  /* Remove the built-in buttons */
  .ant-input-number-handler-wrap {
    display: none;
  }

  @media (max-width: 480px) {
    width: 50px;
    font-size: 12px;
  }
`;

export const WrapperTextLight = styled.span`
    color: #ee4d2d;
    font-size: 14px;
    cursor: pointer;
    display: inline-block;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    line-height: 1.5;
    text-decoration: underline;
    transition: color 0.3s ease, text-decoration 0.3s ease;

    &:hover {
        color: #f95230;
        text-decoration: none;
    }

    @media (max-width: 1200px) {
        font-size: 13px;
    }

    @media (max-width: 992px) {
        font-size: 12px;
    }

    @media (max-width: 768px) {
        font-size: 11px;
    }

    @media (max-width: 576px) {
        font-size: 10px;
    }

    @media (max-width: 480px) {
        font-size: 9px;
    }
`;