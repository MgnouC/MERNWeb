import React from "react";
import styled, { style } from "styled-components";

export const WrapperHeader = styled.h1`
  padding: 10px;
  color: #f95230 !important;
  font-size: 32px;
  line-height: 40px;
  font-weight: 500;
  text-align: center;
  margin-bottom: 20px;
  margin-top: 20px;
  border-bottom: 1px solid #f95230;
  @media screen and (max-width: 768px) {
    font-size: 24px;
    line-height: 32px;
  }
  font-family: san-serif;
`;
