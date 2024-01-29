import React, {useContext} from "react";
import styled from "styled-components";
import { DarkModeContext } from "../store/context";
import PrimaryButton from "./styled/PrimaryButton";

export interface PaginationProps {
  currentPage: number;
  lastPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  onPageChange,
  lastPage,
}: PaginationProps) {
  const theme = useContext(DarkModeContext);
  return (
    <PaginationContainer>
      <PrimaryButton
        data-testid="btn-first"
        disabled={currentPage === 1}
        onClick={() => onPageChange(1)}
      >
        first
      </PrimaryButton>
      <PrimaryButton
        data-testid="btn-previous"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        previous
      </PrimaryButton>
      <PaginationNumber $color={theme.theme.foreground}>{currentPage}</PaginationNumber>
      <PrimaryButton
        data-testid="btn-next"
        disabled={currentPage === lastPage}
        onClick={() => onPageChange(currentPage + 1)}
      >
        next
      </PrimaryButton>
      <PrimaryButton
        data-testid="btn-last"
        disabled={currentPage === lastPage}
        onClick={() => onPageChange(lastPage)}
      >
        last
      </PrimaryButton>
    </PaginationContainer>
  );
}

interface PaginationNumberProps {
  $color: string;
}

const PaginationNumber = styled.p<PaginationNumberProps>`
  font-weight: 700;
  justify-content: center;
  font-size: 20px;
  align-items: center;
  padding-right: 20px;
  padding-left: 20px;
  color: ${(props) => props.$color};
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  max-width: 600px;
  margin: auto;
  align-items: center;
  padding-top: 20px;
`;
