import React, { useContext } from "react";
import styled from "styled-components";
import { DarkModeContext } from "../../store/context";

interface AppContainerRawProps {
  backgroundColor: string;
}

const AppContainerRaw = styled.div<AppContainerRawProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: ${(props) => props.backgroundColor};
  margin-top: 68px;
`;

export default function AppContainer({
  children,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const context = useContext(DarkModeContext);
  return (
    <AppContainerRaw {...props} backgroundColor={context.theme.background}>
      {children}
    </AppContainerRaw>
  );
}
