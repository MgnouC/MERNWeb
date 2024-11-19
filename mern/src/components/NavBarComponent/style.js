import styled from "styled-components";

/* Wrapper for Label Text */
export const WrapperLableText = styled.h4`
    display: flex;
    align-items: center;
    gap: 4px;
    font-weight: 400; /* Uncommented and set to 400 for normal weight */
    font-size: 14px;
    line-height: 1.5;
    color: #003ea1; /* Converted RGB to Hex for consistency */
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;

    /* Responsive Font Sizes */
    @media (max-width: 1200px) {
        font-size: 13px;
    }

    @media (max-width: 992px) {
        font-size: 12px;
    }

    @media (max-width: 768px) {
        font-size: 11px;
        gap: 3px;
    }

    @media (max-width: 576px) {
        font-size: 10px;
        gap: 2px;
    }

    @media (max-width: 480px) {
        font-size: 9px;
        gap: 1px;
    }
`;

/* Wrapper for Text Values */
export const WrapperTextValue = styled.span`
    display: flex;
    align-items: center;
    gap: 4px;
    font-weight: 400;
    font-size: 14px;
    line-height: 1.5;
    color: #fa4f31; !important /* Converted RGB to Hex for consistency */
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;

    /* Responsive Font Sizes */
    @media (max-width: 1200px) {
        font-size: 13px;
    }

    @media (max-width: 992px) {
        font-size: 12px;
    }

    @media (max-width: 768px) {
        font-size: 11px;
        gap: 3px;
    }

    @media (max-width: 576px) {
        font-size: 10px;
        gap: 2px;
    }

    @media (max-width: 480px) {
        font-size: 9px;
        gap: 1px;
    }
`;

/* Wrapper for Text Content */
export const WrapperTextContent = styled.div`
    display: flex;
    align-items: center; /* Corrected property name */
    flex-direction: column;
    gap: 12px;

    /* Responsive Adjustments */
    @media (max-width: 1200px) {
        gap: 10px;
    }

    @media (max-width: 992px) {
        gap: 8px;
    }

    @media (max-width: 768px) {
        gap: 6px;
    }

    @media (max-width: 576px) {
        gap: 4px;
    }

    @media (max-width: 480px) {
        gap: 2px;
    }
`;
