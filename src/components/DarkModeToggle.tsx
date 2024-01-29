import React, { useContext } from "react";
import Toggle from "react-toggle";
import styled from "styled-components";
import { DarkModeContext, themeList, ThemeName } from "../store/context";

export default function DarkModeToggle() {
  const context = useContext(DarkModeContext);

  return (
    <ToggleContainer>
      <Toggle
        defaultChecked={context.theme === themeList.dark}
        onChange={() => {
          if (context.theme === themeList.dark) {
            context.setTheme(ThemeName.LIGHT);
          } else {
            context.setTheme(ThemeName.DARK);
          }
        }}
      />
      <ToggleLabel>Dark Mode</ToggleLabel>
    </ToggleContainer>
  );
}

const ToggleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ToggleLabel = styled.span`
  margin-left: 10px;
`;
