import React, { useContext } from "react";
import Toggle from "react-toggle";
import styled from "styled-components";
import { DarkModeContext, themeList } from "../store/context";

export default function DarkModeToggle() {
  const context = useContext(DarkModeContext);

  return (
    <ToggleContainer>
      <Toggle
        data-testid="dark-mode-toggle"
        defaultChecked={context.theme === themeList.dark}
        onChange={context.toggleTheme}
      />
      <ToggleLabel $color={context.theme.background_secondary}>Dark Mode</ToggleLabel>
    </ToggleContainer>
  );
}

const ToggleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;


interface ToggleLabelProps {
  $color: string;
}

const ToggleLabel = styled.span<ToggleLabelProps>`
  margin-left: 10px;
  color: ${(props) => props.$color};
`;
