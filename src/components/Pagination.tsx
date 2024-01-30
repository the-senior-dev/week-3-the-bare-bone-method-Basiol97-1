import React from 'react'
import styled from 'styled-components';

type Props = {
	currentPage: number,
	handleUpdatePage: (action: string) => void
};

const Pagination = ({ currentPage, handleUpdatePage }: Props) => {
	return (
		<PaginationContainer>
			<PaginationButton onClick={() => handleUpdatePage('first')}>First</PaginationButton>
			<PaginationButton onClick={() => handleUpdatePage('previous')}>Previous</PaginationButton>
			<span>{currentPage}</span>
			<PaginationButton onClick={() => handleUpdatePage('next')}>Next</PaginationButton>
			<PaginationButton onClick={() => handleUpdatePage('final')}>last</PaginationButton>
		</PaginationContainer>
	)
};

export default Pagination

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;
  align-items: center;
`;

const PaginationButton = styled.button`
  padding: 10px;
  border-radius: 5px;
  background-color: #e1f7f7;
  min-width: 70px;
  border: 0.5px solid black;
  text-align: center;
`;
