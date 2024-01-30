import React, { useEffect, useState } from "react";
import styled from "styled-components";

import movieApiClient from "../utils/apiClient";
import { ErrorMessage, PageSection, SectionTitle } from "./styled";
import LoadingIndicator from "./styled/LoadingIndicator";
import MoviesLayout from "./MoviesLayout";

export default function UpcomingMovies() {
	const [movieListUpcoming, setMovieListUpcoming] = useState<Movie[] | null>(
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
					setMovieListUpcoming(data.results);
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
				<UpComingMoviesContainer>
					<LoadingIndicator data-testid="upcoming-now-movies-loading" />
				</UpComingMoviesContainer>
			</PageSection>
		);
	}

	if (error) {
		return (
			<PageSection aria-labelledby="upcoming-movies-now-heading">
				<SectionTitle>Upcoming Movies</SectionTitle>
				<UpComingMoviesContainer>
					<ErrorMessage
						data-testid="upcoming-movies-error-message"
						aria-live="polite"
					>
						{error.message}
					</ErrorMessage>
				</UpComingMoviesContainer>
			</PageSection>
		);
	}

	return (
		<PageSection aria-labelledby="upcoming-movies-now-heading">
			<SectionTitle>Upcoming Movies</SectionTitle>
			<UpComingMoviesContainer
				data-testid={"upcoming-movies-container"}
				aria-label="List of upcoming movies"
				role="list"
			>
				<MoviesLayout moviesList={movieListUpcoming} />
			</UpComingMoviesContainer>
		</PageSection>
	);
}

const UpComingMoviesContainer = styled.div`
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
