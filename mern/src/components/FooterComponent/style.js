import styled from "styled-components";

export const FooterContainer = styled.footer`
  background-color: #f5f5f5;
  color: #333;
  padding: 40px 20px;
  font-family: Arial, sans-serif;
  position: relative;
  bottom: 0;
  width: 100%;
  margin-top: auto;
`;


export const FooterTop = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const FooterSection = styled.div`
  width: 23%;
`;

export const FooterTitle = styled.h4`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #f95230;
`;

export const FooterList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const FooterItem = styled.li`
  margin-bottom: 10px;
`;

export const FooterLink = styled.a`
  color: #333;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s ease;

  &:hover {
    color: #f95230;
    text-decoration: underline;
  }
`;

export const FooterBottom = styled.div`
  text-align: center;
  border-top: 1px solid #ddd;
  padding-top: 20px;
  margin-top: 20px;
`;

export const SocialLinks = styled.div`
  display: flex;
  gap: 10px;
`;

export const SocialIcon = styled.a`
  display: inline-block;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #f95230;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #d34124;
  }
`;

export const FooterText = styled.p`
  font-size: 14px;
  color: #999;
  margin: 0;
`;
