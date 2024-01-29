import React, { useEffect, useState } from "react";
import styled from "styled-components";

import movieApiClient from "../utils/apiClient";
import SimpleMovieCard from "./SimpleMovieCard";
import { PageSection, SectionTitle, ErrorMessage } from "./styled";
import LoadingIndicator from "./styled/LoadingIndicator";

export default function TopRatedMovies() {
  const [moviesTopRated, setMoviesTopRated] = useState<Movie[] | null>([]);
  const [error, setFetchError] = useState<ApiError | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const data = await movieApiClient.getMovieListTopRated();
        if ("message" in data) {
          setFetchError({ message: data.message, isError: true });
        } else {
          setMoviesTopRated(data.results);
        }
      } catch (err) {
        setFetchError({ message: "An error occured.", isError: true });
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <PageSection aria-labelledby="top-rated-movies-heading">
      <SectionTitle>Top Rated</SectionTitle>
      <TopRatedContainer
        data-testid={"top-rated-movies-container"}
        aria-label="List of top rated movies"
        role="list"
      >
        {loading ? (
          <LoadingIndicator data-testid="top-rated-movies-loading-indicator"/> 
        ) : (
          !error &&
          moviesTopRated?.map((movie) => (
            <SimpleMovieCard
              data-testid={`top-rated-movies-card-${movie.id}`}
              movie={movie}
              key={movie.id}
            />
          ))
        )}
      </TopRatedContainer>
      {error && (
        <ErrorMessage data-testid="top-rated-movies-error-message" aria-live="polite">
          {error?.message}
        </ErrorMessage>
      )}
    </PageSection>
  );
}

const TopRatedContainer = styled.div`
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
