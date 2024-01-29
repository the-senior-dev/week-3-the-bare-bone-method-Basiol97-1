import React from "react";
import styled, { keyframes } from "styled-components";
import settings from "../../settings";

interface LoadingIndicatorProps {
  "data-testid": string;
}

const LoadingIndicator = ({
  "data-testid": dataTestId,
}: LoadingIndicatorProps) => (
  <LoadingComponent data-testid={dataTestId}>
    <Spinner viewBox="0 0 50 50">
      <circle cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
    </Spinner>
    <p>Loading...</p>
  </LoadingComponent>
);

const spinAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.svg`
  animation: ${spinAnimation} 1s linear infinite;
  height: 50px;
  width: 50px;
  fill: ${settings.colors.foreground};
`;

export const LoadingComponent = styled.div`
  color: ${settings.colors.foreground};
  background-color: ${settings.colors.backgroundSecondary};
  border-left: 5px solid ${settings.colors.foreground};
  padding: 10px;
  margin: 20px 0;
  border-radius: 4px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  &:before {
    content: "";
    display: inline-block;
    margin-right: 10px;
  }
`;

export default LoadingIndicator;
