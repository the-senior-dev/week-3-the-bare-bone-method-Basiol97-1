import React from "react";
import styled from "styled-components";
import logoWhite from "../assets/logo-white.png";

export default function Footer() {
  return (
    <FooterContainer>
      <div>
        <FooterLink>Youtube</FooterLink>
        <FooterLink>LinkedIn</FooterLink>
        <FooterLink>Website</FooterLink>
        <FooterLink>Dev.to</FooterLink>
        <FooterLink>Medium</FooterLink>
      </div>
      <FooterLogo src={logoWhite}></FooterLogo>© 1990-{new Date().getFullYear()}{" "}
      by theSeniorDev.com
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
`;

const FooterContainer = styled.div`
  width: 100%;
  background-color: #2d3436;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-top: 20px;
  padding-bottom: 20px;
  margin-top: 10px;
`;
