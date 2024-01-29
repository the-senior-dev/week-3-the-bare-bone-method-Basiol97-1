import React, { useContext } from "react";
import Toggle from "react-toggle";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { themeList } from "../store/theme";
import { ThemeState, toggleTheme } from "../store/redux/themeSlice";

export default function DarkModeToggle() {
  //const { theme, toggleTheme } = useContext(DarkModeContext);
  const theme = useSelector((state: ThemeState) => state.theme);
  const dispatch = useDispatch();

  return (
    <ToggleContainer>
      <Toggle
        defaultChecked={theme === themeList.dark}
        data-cy="dark-mode-toggle"
        onChange={() => {
          dispatch(toggleTheme());
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
