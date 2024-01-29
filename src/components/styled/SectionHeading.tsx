import React, { useContext } from "react";
import styled from "styled-components";
import { DarkModeContext } from "../../store/context";

interface SectionHeadingRawProps {
  textColor: string;
}

export const SectionHeadingRaw = styled.h1<SectionHeadingRawProps>`
  width: 100%;
  text-align: left;
  padding-left: 10px;
  color: ${(props) => props.textColor};
`;

export default function SectionHeading({
  children,
  ...props
}: React.ComponentPropsWithoutRef<"h1">) {
  const context = useContext(DarkModeContext);
  return (
    <SectionHeadingRaw {...props} textColor={context.theme.foreground}>
      {children}
    </SectionHeadingRaw>
  );
}
