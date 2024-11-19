import { Row } from "antd";
import styled from "styled-components";

/* Header Wrapper */
export const WrapperHeader = styled(Row)`
  padding: 10px 120px;
  background-color: #f95230;
  align-items: center;
  gap: 16px;
  flex-wrap: nowrap;
  width: 100%;

  /* Responsive Adjustments */
  @media (max-width: 1200px) {
    padding: 10px 80px;
    gap: 14px;
  }

  @media (max-width: 992px) {
    padding: 10px 60px;
    gap: 12px;
  }

  @media (max-width: 768px) {
    padding: 10px 40px;
    gap: 10px;
  }

  @media (max-width: 576px) {
    padding: 10px 20px;
    gap: 8px;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  @media (max-width: 480px) {
    padding: 10px 15px;
    gap: 6px;
    flex-direction: column;
    align-items: flex-start;
  }
`;

/* Header Text */
export const WrapperTextHeader = styled.span`
  font-size: 24px;
  color: #ededed;
  font-weight: bold;
  text-align: left;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;

  /* Responsive Font Sizes */
  @media (max-width: 1200px) {
    font-size: 22px;
  }

  @media (max-width: 992px) {
    font-size: 20px;
  }

  @media (max-width: 768px) {
    font-size: 18px;
  }

  @media (max-width: 576px) {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

/* Header Account Section */
export const WrapperHeaderAccount = styled.div.attrs({
  role: 'button',
  tabIndex: 0,
  'aria-label': 'Account Settings'
})`
  display: flex;
  align-items: center;
  color: #ededed;
  gap: 10px;
  cursor: pointer;
  transition: opacity 0.3s ease, transform 0.3s ease;

  &:hover {
    opacity: 0.8;
    transform: translateY(-2px);
  }

  &:focus {
   
  }

  /* Responsive Adjustments */
  @media (max-width: 1200px) {
    gap: 9px;
  }

  @media (max-width: 992px) {
    gap: 8px;
  }

  @media (max-width: 768px) {
    gap: 7px;
  }

  @media (max-width: 576px) {
    gap: 6px;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }
`;

/* Small Header Text */
export const WrapperTextHeaderSmall = styled.span`
  font-size: 12px;
  color: #ededed;
  white-space: nowrap;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 150px;
  display: inline-block;
  vertical-align: middle;

  /* Responsive Adjustments */
  @media (max-width: 1200px) {
    max-width: 140px;
  }

  @media (max-width: 992px) {
    max-width: 130px;
  }

  @media (max-width: 768px) {
    max-width: 120px;
    font-size: 11px;
  }

  @media (max-width: 576px) {
    max-width: 100px;
    font-size: 10px;
  }

  @media (max-width: 480px) {
    max-width: 90px;
    font-size: 9px;
    white-space: normal; /* Allow wrapping on very small screens */
  }
`;

/* Popup Content */
export const WrapperContentPopup = styled.p`
  cursor: pointer;
  font-size: 14px;
  color: #ededed;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  transition: color 0.3s ease, background-color 0.3s ease;
  padding: 8px 12px;
  border-radius: 4px;
  margin: 0; /* Reset margin to prevent unexpected spacing */

  &:hover {
    color: #f95230;
    background-color: rgba(255, 255, 255, 0.1);
  }

  &:focus {
    outline: 2px solid #ffffff;
  }

  /* Responsive Adjustments */
  @media (max-width: 1200px) {
    font-size: 13px;
    padding: 7px 11px;
  }

  @media (max-width: 992px) {
    font-size: 12px;
    padding: 6px 10px;
  }

  @media (max-width: 768px) {
    font-size: 11px;
    padding: 5px 9px;
  }

  @media (max-width: 576px) {
    font-size: 10px;
    padding: 4px 8px;
  }

  @media (max-width: 480px) {
    font-size: 9px;
    padding: 3px 7px;
  }
`;
