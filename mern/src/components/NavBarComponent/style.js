import styled from "styled-components";

/* Wrapper for Label Text */
export const WrapperLabelText = styled.h4`
  font-weight: 600;
  font-size: 16px;
  line-height: 1.5;
  color: #333333;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  margin-bottom: 16px;
  transition: color 0.3s ease;

  &:hover {
    color: #f95230;
  }

  /* Responsive Font Sizes */
  @media (max-width: 1200px) {
    font-size: 15px;
  }

  @media (max-width: 992px) {
    font-size: 14px;
  }

  @media (max-width: 768px) {
    font-size: 13px;
  }

  @media (max-width: 576px) {
    font-size: 12px;
  }

  @media (max-width: 480px) {
    font-size: 11px;
  }
`;

/* Wrapper for Text Values */
export const WrapperTextValue = styled.span`
  font-size: 14px;
  line-height: 1.5;
  color: #555555;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  margin-bottom: 8px;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #f95230;
  }

  /* Responsive Font Sizes */
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

/* Wrapper for Text Content */
export const WrapperTextContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  padding-left: 16px;

  /* Responsive Adjustments */
  @media (max-width: 1200px) {
    gap: 10px;
    padding-left: 14px;
  }

  @media (max-width: 992px) {
    gap: 8px;
    padding-left: 12px;
  }

  @media (max-width: 768px) {
    gap: 6px;
    padding-left: 10px;
  }

  @media (max-width: 576px) {
    gap: 4px;
    padding-left: 8px;
  }

  @media (max-width: 480px) {
    gap: 2px;
    padding-left: 6px;
  }
`;

/* Style for Checkboxes */
export const StyledCheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  .ant-checkbox-wrapper {
    font-size: 14px;
    color: #555555;
    transition: color 0.3s ease;

    &:hover {
      color: #f95230;
    }

    .ant-checkbox-inner {
      border-color: #f95230;
    }

    .ant-checkbox-checked .ant-checkbox-inner {
      background-color: #f95230;
      border-color: #f95230;
    }
  }

  /* Responsive Font Sizes */
  @media (max-width: 1200px) {
    gap: 10px;

    .ant-checkbox-wrapper {
      font-size: 13px;
    }
  }

  @media (max-width: 992px) {
    gap: 8px;

    .ant-checkbox-wrapper {
      font-size: 12px;
    }
  }

  @media (max-width: 768px) {
    gap: 6px;

    .ant-checkbox-wrapper {
      font-size: 11px;
    }
  }

  @media (max-width: 576px) {
    gap: 4px;

    .ant-checkbox-wrapper {
      font-size: 10px;
    }
  }

  @media (max-width: 480px) {
    gap: 2px;

    .ant-checkbox-wrapper {
      font-size: 9px;
    }
  }
`;

/* Style for Ratings */
export const StyledRate = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  .ant-rate {
    font-size: 14px;
    color: #fadb14;
  }

  span {
    font-size: 14px;
    color: #555555;
    margin-left: 8px;
  }

  &:hover span {
    color: #f95230;
  }

  /* Responsive Adjustments */
  @media (max-width: 1200px) {
    gap: 7px;

    .ant-rate {
      font-size: 13px;
    }

    span {
      font-size: 13px;
    }
  }

  @media (max-width: 992px) {
    gap: 6px;

    .ant-rate {
      font-size: 12px;
    }

    span {
      font-size: 12px;
    }
  }

  @media (max-width: 768px) {
    gap: 5px;

    .ant-rate {
      font-size: 11px;
    }

    span {
      font-size: 11px;
    }
  }

  @media (max-width: 576px) {
    gap: 4px;

    .ant-rate {
      font-size: 10px;
    }

    span {
      font-size: 10px;
    }
  }

  @media (max-width: 480px) {
    gap: 3px;

    .ant-rate {
      font-size: 9px;
    }

    span {
      font-size: 9px;
    }
  }
`;

/* Style for Price Tags */
export const StyledPriceTag = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  span {
    padding: 6px 12px;
    border-radius: 20px;
    background-color: #fff0e6;
    color: #f95230;
    font-size: 14px;
    font-weight: 500;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #fcdad1;
    }
  }

  /* Responsive Adjustments */
  @media (max-width: 1200px) {
    gap: 7px;

    span {
      font-size: 13px;
    }
  }

  @media (max-width: 992px) {
    gap: 6px;

    span {
      font-size: 12px;
    }
  }

  @media (max-width: 768px) {
    gap: 5px;

    span {
      font-size: 11px;
    }
  }

  @media (max-width: 576px) {
    gap: 4px;

    span {
      font-size: 10px;
    }
  }

  @media (max-width: 480px) {
    gap: 3px;

    span {
      font-size: 9px;
    }
  }
`;
