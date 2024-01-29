import React from "react";
import styled from "styled-components";
import DarkModeToggle from "./DarkModeToggle";

export default function Header() {
  return (
    <HeaderContainer>
      <HeaderWrapper>
        <h2>The Movie App</h2>
        <DarkModeToggle></DarkModeToggle>
      </HeaderWrapper>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  width: 100%;
  background-color: #202426;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0px;
  z-index: 10;
  height: 68px;
`;

const HeaderWrapper = styled.div`
  max-width: 1300px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
