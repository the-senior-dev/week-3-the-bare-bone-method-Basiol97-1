import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import logo from "../assets/logo-white.png";
import settings from "../settings";

export default function Header() {
  return (
    <HeaderContainer>
      <HeaderWrapper role="navigation" aria-label="Movie App">
        <HeaderLink to="/">
          <HeaderHeading>The Movie App</HeaderHeading>
        </HeaderLink>
        <HeaderLink
          to="https://theseniordev.com"
          target="_blank"
          data-testid="header-logo"
        >
          <HeaderLogo src={logo} alt="theSeniorDev"></HeaderLogo>
        </HeaderLink>
      </HeaderWrapper>
    </HeaderContainer>
  );
}

const HeaderLink = styled(Link)`
  text-decoration: none;
  color: ${settings.colors.backgroundSecondary};
`;

const HeaderLogo = styled.img`
  height: 20px;
  padding-right: 10px;
  width: auto;
`;

const HeaderHeading = styled.h4`
  font-size: 1.2em;
  margin: 0;
  padding: 0;
  font-weight: 500;
  text-decoration: none;
  color: ${settings.colors.background};
`;

const HeaderContainer = styled.div`
  width: 100%;
  background-color: ${settings.colors.foreground};
  color: ${settings.colors.backgroundSecondary};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 14px;
  box-sizing: border-box;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const HeaderWrapper = styled.div`
  max-width: 1300px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
