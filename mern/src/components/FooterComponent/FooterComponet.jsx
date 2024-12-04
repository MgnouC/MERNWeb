import React from "react";
import {
  FooterContainer,
  FooterTop,
  FooterSection,
  FooterTitle,
  FooterList,
  FooterItem,
  FooterLink,
  FooterBottom,
  SocialLinks,
  SocialIcon,
  FooterText,
} from "./style";

const FooterComponent = () => {
  return (
    <FooterContainer>
      {/* Top Section */}
      <FooterTop>
        <FooterSection>
          <FooterTitle>About Us</FooterTitle>
          <FooterList>
            <FooterItem>
              <FooterLink href="/">Company Information</FooterLink>
            </FooterItem>
            <FooterItem>
              <FooterLink href="/">Careers</FooterLink>
            </FooterItem>
            <FooterItem>
              <FooterLink href="/">Privacy Policy</FooterLink>
            </FooterItem>
            <FooterItem>
              <FooterLink href="/">Terms & Conditions</FooterLink>
            </FooterItem>
          </FooterList>
        </FooterSection>
        <FooterSection>
          <FooterTitle>Customer Service</FooterTitle>
          <FooterList>
            <FooterItem>
              <FooterLink href="/">Help Center</FooterLink>
            </FooterItem>
            <FooterItem>
              <FooterLink href="/">Order Tracking</FooterLink>
            </FooterItem>
            <FooterItem>
              <FooterLink href="/">Returns & Refunds</FooterLink>
            </FooterItem>
            <FooterItem>
              <FooterLink href="/">FAQs</FooterLink>
            </FooterItem>
          </FooterList>
        </FooterSection>
        <FooterSection>
          <FooterTitle>Quick Links</FooterTitle>
          <FooterList>
            <FooterItem>
              <FooterLink href="/">Shopee Mall</FooterLink>
            </FooterItem>
            <FooterItem>
              <FooterLink href="/">Shopee Coins</FooterLink>
            </FooterItem>
            <FooterItem>
              <FooterLink href="/">Shop Online</FooterLink>
            </FooterItem>
          </FooterList>
        </FooterSection>
        <FooterSection>
          <FooterTitle>Follow Us</FooterTitle>
          <SocialLinks>
            <SocialIcon href="/" target="_blank">FB</SocialIcon>
            <SocialIcon href="/" target="_blank">IG</SocialIcon>
            <SocialIcon href="/" target="_blank">TW</SocialIcon>
          </SocialLinks>
        </FooterSection>
      </FooterTop>

      {/* Bottom Section */}
      <FooterBottom>
        <FooterText>© 2024 SELLSOME. All rights reserved.</FooterText>
      </FooterBottom>
    </FooterContainer>
  );
};

export default FooterComponent;
