import React, { useContext } from "react";
import styled from "styled-components";
import { DarkModeContext } from "../../store/context";

export const PageContainer = styled.div`
  max-width: 1300px;
`;

export const MovieSliderContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-left: 10px;
  padding-right: 10px;
`;
