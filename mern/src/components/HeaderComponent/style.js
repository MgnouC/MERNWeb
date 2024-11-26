import styled from "styled-components";

/* Container cho Header */
export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 120px;
  background-color: #f95230;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;

  /* Responsive Adjustments */
  @media (max-width: 992px) {
    padding: 15px 60px;
  }

  @media (max-width: 768px) {
    padding: 15px 40px;
    flex-wrap: wrap;
    justify-content: center;
  }

  @media (max-width: 576px) {
    padding: 15px 20px;
  }
`;

/* Logo */
export const LogoWrapper = styled.div`
  font-size: 28px;
  color: #ffffff;
  font-weight: bold;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #ffe6e1;
  }
`;

/* Search Bar */
export const SearchWrapper = styled.div`
  flex: 1;
  margin: 0 0 0 45px;

  /* Responsive Adjustments */
  @media (max-width: 768px) {
    width: 100%;
    margin: 15px 0;
  }
`;

/* Account Section */
export const AccountWrapper = styled.div`
  display: flex;
  align-items: center;
  color: #ffffff;
  gap: 10px;
  cursor: pointer;
  margin: 0 10px ;
  & > div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    color: #ffffff;
  }

  & span {
    font-size: 14px;
  }

  &:hover {
    background-color:  #f95230 !important;
    opacity: 0.9;
  }
`;

/* User Name Display */
export const UserName = styled.span`
  font-size: 16px;
  color: #ffffff;
  font-weight: 500;
`;

/* Cart Section */
export const CartWrapper = styled.div`
  display: flex;
  align-items: center;
  color: #ffffff;
  gap: 10px;
  cursor: pointer;

  & span {
    font-size: 14px;
  }

  &:hover {
    opacity: 0.9;
  }
`;

/* Account Options in Popover */
export const AccountOptions = styled.div`
  display: flex;
  flex-direction: column;

  & p {
    cursor: pointer;
    font-size: 14px;
    color: #333;
    padding: 8px 12px;
    margin: 0;
    transition: background-color 0.3s ease;

    &:hover {
    color: #f95230;
      background-color:  #fff ;
    }
  }
`;
