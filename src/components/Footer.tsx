import React from "react";
import styled from "styled-components";
import logoWhite from "../assets/logo-white.png";

export default function Footer() {
  return (
    <FooterContainer>
      <div>
        <FooterLink href="https://www.youtube.com">Youtube</FooterLink>
        <FooterLink href="https://www.linkedin.com">LinkedIn</FooterLink>
        <FooterLink href="https://www.example.com">Website</FooterLink>
        <FooterLink href="https://dev.to">Dev.to</FooterLink>
        <FooterLink href="https://www.medium.com">Medium</FooterLink>
      </div>
      <FooterLogo src={logoWhite}></FooterLogo>© {new Date().getFullYear()} by
      theSeniorDev.com
    </FooterContainer>
  );
}

const FooterLogo = styled.img`
  height: 60px;
  padding-top: 20px;
  padding-bottom: 20px;
`;

const FooterLink = styled.a`
  height: 60px;
  margin: 10px;
  color: #dfe6e9;
  text-decoration: none;
`;

const FooterContainer = styled.div`
  width: 100%;
  background-color: #202426;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-top: 20px;
  padding-bottom: 20px;
  margin-top: 10px;
`;
