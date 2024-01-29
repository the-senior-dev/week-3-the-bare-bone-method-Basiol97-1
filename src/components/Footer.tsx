import React from "react";
import styled from "styled-components";
import logoWhite from "../assets/logo-white.png";

export default function Footer() {
  return (
    <FooterContainer>
      <div>
        <FooterLink href="/">Youtube</FooterLink>
        <FooterLink href="/">LinkedIn</FooterLink>
        <FooterLink href="/">Website</FooterLink>
        <FooterLink href="/">Dev.to</FooterLink>
        <FooterLink href="/">Medium</FooterLink>
      </div>
      <FooterLogo src={logoWhite} alt="the-senior-dev"></FooterLogo>© 1990-
      {new Date().getFullYear()} by theSeniorDev.com
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
