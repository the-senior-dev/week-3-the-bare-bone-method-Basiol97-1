import React from "react";
import styled from "styled-components";

export default function Header() {
  return (
    <HeaderContainer>
      <HeaderWrapper>
        <h2>The Movie App</h2>
      </HeaderWrapper>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  width: 100%;
  background-color: #2d3436;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeaderWrapper = styled.div`
  max-width: 1300px;
  width: 100%;
`;
