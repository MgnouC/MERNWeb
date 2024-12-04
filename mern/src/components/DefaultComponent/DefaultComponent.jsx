import React, { Children } from "react";
import HeaderComponent from "../HeaderComponent/HeaderComponent";
import FooterComponent from "../FooterComponent/FooterComponet";

import { Content, Container } from "./style";
const DefaultComponent = ({ children }) => {
  return (
    <div>
      <div>
        <Container>
          <HeaderComponent />
         {children}
        </Container>{" "}
      </div>
      <FooterComponent />
      
    </div>
  );
};

export default DefaultComponent;
