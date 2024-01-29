import React, { useEffect, useState } from "react";
import styled from "styled-components";

import movieApiClient from "../utils/apiClient";
import SimpleMovieCard from "./SimpleMovieCard";
import { ErrorMessage, PageSection, SectionTitle } from "./styled";
import LoadingIndicator from "./styled/LoadingIndicator";

export default function UpcomingMovies() {
	const [movieListTrending, setMovieListTrending] = useState<Movie[] | null>(
		[]
	);
	const [error, setFetchError] = useState<ApiError | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchMovies = async () => {
			try {
				setLoading(true);
				const data = await movieApiClient.getMovieListUpcomingMovies();
				if ("message" in data) {
					setFetchError({ message: data.message, isError: true });
				} else {
					setMovieListTrending(data.results);
				}
			} catch (err) {
				setFetchError({ message: "An error occured.", isError: true });
			} finally {
				setLoading(false);
			}
		};

		fetchMovies();
	}, []);

	if (loading) {
		return (
			<PageSection aria-labelledby="upcoming-movies-now-heading">
				<SectionTitle>Upcoming Movies</SectionTitle>
				<TrendingContainer>
					<LoadingIndicator data-testid="upcoming-now-movies-loading" />
				</TrendingContainer>
			</PageSection>
		);
	}

	if (error) {
		return (
			<PageSection aria-labelledby="upcoming-movies-now-heading">
				<SectionTitle>Upcoming Movies</SectionTitle>
				<TrendingContainer>
					<ErrorMessage
						data-testid="upcoming-movies-error-message"
						aria-live="polite"
					>
						{error.message}
					</ErrorMessage>
				</TrendingContainer>
			</PageSection>
		);
	}

	return (
		<PageSection aria-labelledby="upcoming-movies-now-heading">
			<SectionTitle>Upcoming Movies</SectionTitle>
			<TrendingContainer
				data-testid={"upcoming-movies-container"}
				aria-label="List of upcoming movies"
				role="list"
			>
				{movieListTrending?.map((mov) => (
					<SimpleMovieCard
						data-testid={`upcoming-movies-card-${mov.id}`}
						movie={mov}
						key={mov.id}
					/>
				))}
			</TrendingContainer>
		</PageSection>
	);
}

const TrendingContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  overflow: scroll;
  max-height: 200px;
  -ms-overflow-style: none;
  scrollbar-width: none;
  padding-bottom: 20px;
  ::-webkit-scrollbar {
    display: none;
  }
`;
