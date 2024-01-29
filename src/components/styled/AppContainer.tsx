import React, { useContext } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../store/redux/store";


interface AppContainerRawProps {
  $backgroundColor: string;
}

const AppContainerRaw = styled.div<AppContainerRawProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: ${(props) => props.$backgroundColor};
  margin-top: 68px;
`;

export default function AppContainer({
  children,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const theme = useSelector((state: RootState) => state.themeReducer.theme);
  return (
    <AppContainerRaw {...props} $backgroundColor={theme.background} data-cy="app-container">
      {children}
    </AppContainerRaw>
  );
}
