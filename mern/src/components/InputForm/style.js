import { Input } from "antd";
import styled from "styled-components";

export const WrapperInputStyle = styled(Input)`
    border: none;
    border-bottom: 1px solid #ccc;
    outline: none;
    box-shadow: none;
    transition: background-color 0.3s ease, border-bottom-color 0.3s ease;

    &:focus {
        background: rgb(255, 238, 231);
        border-bottom-color: #f95230;
    }

    /* Responsive Font Sizes and Padding */
    font-size: 14px;
    padding: 8px 0;

    @media (max-width: 1200px) {
        font-size: 13px;
        padding: 7px 0;
    }

    @media (max-width: 992px) {
        font-size: 12px;
        padding: 6px 0;
    }

    @media (max-width: 768px) {
        font-size: 11px;
        padding: 5px 0;
    }

    @media (max-width: 576px) {
        font-size: 10px;
        padding: 4px 0;
    }

    @media (max-width: 480px) {
        font-size: 9px;
        padding: 3px 0;
    }
`;
