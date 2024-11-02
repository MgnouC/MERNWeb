import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

/* Wrapper for Product Types */
export const WrapperTypeProduct = styled.div`
  background-color: #ffffff; /* Corrected property name and value */
  padding: 0px 120px;
  font-size: 20px;
  display: flex;
  align-items: center;
  gap: 24px;
  justify-content: flex-start;
  height: 44px;

  /* Responsive Adjustments */
  @media (max-width: 1200px) {
    padding: 0px 80px;
    gap: 20px;
    font-size: 18px;
  }

  @media (max-width: 992px) {
    padding: 0px 60px;
    gap: 16px;
    font-size: 16px;
  }

  @media (max-width: 768px) {
    padding: 0px 40px;
    gap: 12px;
    font-size: 14px;
    height: 40px;
  }

  @media (max-width: 576px) {
    padding: 0px 20px;
    gap: 8px;
    font-size: 12px;
    height: auto;
    flex-wrap: wrap;
  }

  @media (max-width: 480px) {
    padding: 0px 15px;
    gap: 6px;
    font-size: 10px;
  }
`;

/* Styled Button for "More" Action */
export const WrapperButtonMore = styled(ButtonComponent)`
  border-radius: 0px 20px 20px 0px;
  width: 100%;
  padding: 8px 16px;
  font-size: 16px;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    color: #fff;
    background-color: rgb(250, 79, 49);
    
    /* Ensuring nested span also changes color */
    span {
      color: #fff;
    }
  }

  /* Responsive Adjustments */
  @media (max-width: 1200px) {
    padding: 7px 14px;
    font-size: 15px;
  }

  @media (max-width: 992px) {
    padding: 6px 12px;
    font-size: 14px;
  }

  @media (max-width: 768px) {
    padding: 5px 10px;
    font-size: 13px;
  }

  @media (max-width: 576px) {
    padding: 4px 8px;
    font-size: 12px;
    border-radius: 0px 16px 16px 0px; /* Slight adjustment for smaller screens */
  }

  @media (max-width: 480px) {
    padding: 3px 6px;
    font-size: 11px;
    border-radius: 0px 14px 14px 0px;
  }
`;

/* Wrapper for Products List */
export const WrapperProducts = styled.div`
  margin-top: 30px;
  display: flex;
  align-items: center; /* Corrected property name */
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;

  /* Responsive Adjustments */
  @media (max-width: 1200px) {
    gap: 18px;
  }

  @media (max-width: 992px) {
    gap: 16px;
  }

  @media (max-width: 768px) {
    gap: 14px;
  }

  @media (max-width: 576px) {
    gap: 12px;
    justify-content: center; /* Center items on smaller screens */
  }

  @media (max-width: 480px) {
    gap: 10px;
    flex-direction: column;
    align-items: flex-start;
  }
`;
