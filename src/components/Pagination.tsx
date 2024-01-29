import React, { useContext } from "react";
import styled from "styled-components";
import PrimaryButton from "../components/styled/PrimaryButton";
import { DarkModeContext } from "../store/context";

interface PaginationProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  lastPage: number;
}

export default function Pagination({
  currentPage,
  setCurrentPage,
  lastPage,
}: PaginationProps) {
  const context = useContext(DarkModeContext);

  return (
    <PaginationContainer>
      <PrimaryButton
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(1)}
      >
        first
      </PrimaryButton>
      <PrimaryButton
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        previous
      </PrimaryButton>
      <PaginationNumber color={context.theme.foreground}>
        {currentPage}
      </PaginationNumber>
      <PrimaryButton
        disabled={currentPage === lastPage}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        next
      </PrimaryButton>
      <PrimaryButton
        disabled={currentPage === lastPage}
        onClick={() => setCurrentPage(lastPage)}
      >
        last
      </PrimaryButton>
    </PaginationContainer>
  );
}

const PaginationNumber = styled.p`
  font-weight: 700;
  justify-content: center;
  font-size: 20px;
  align-items: center;
  padding-right: 20px;
  padding-left: 20px;
  color: ${(props) => props.color};
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  max-width: 600px;
  margin: auto;
  align-items: center;
  padding-top: 20px;
`;
