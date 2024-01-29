import React, { useContext } from "react";
import styled from "styled-components";
import PrimaryButton from "../components/styled/PrimaryButton";
import { DarkModeContext } from "../store/context";

export interface PaginationProps {
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
        data-testid="btn-first"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(1)}
      >
        first
      </PrimaryButton>
      <PrimaryButton
        data-testid="btn-previous"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        previous
      </PrimaryButton>
      <PaginationNumber $colour={context.theme.foreground}>{currentPage}</PaginationNumber>
      <PrimaryButton
        data-testid="btn-next"
        disabled={currentPage === lastPage}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        next
      </PrimaryButton>
      <PrimaryButton
        data-testid="btn-last"
        disabled={currentPage === lastPage}
        onClick={() => setCurrentPage(lastPage)}
      >
        last
      </PrimaryButton>
    </PaginationContainer>
  );
}

interface PaginationNumberProps {
  $colour: string;
}

const PaginationNumber = styled.p<PaginationNumberProps>`
  font-weight: 700;
  justify-content: center;
  font-size: 20px;
  align-items: center;
  padding-right: 20px;
  padding-left: 20px;
  color: ${(props) => props.$colour};
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  max-width: 600px;
  margin: auto;
  align-items: center;
  padding-top: 20px;
`;
