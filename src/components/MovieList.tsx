import React, { useEffect, useState } from "react";
import styled from "styled-components";
import movieApiClient from "../utils/apiClient";
import MovieCard from "./MovieCard";
import { ErrorMessage } from "./styled";
import LoadingIndicator from "./styled/LoadingIndicator";

export default function MovieList() {
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [error, setFetchError] = useState<ApiError | null>();
  const [loading, setLoading] = useState<boolean>(true); // New loading state

  async function getMovies() {
    try {
      setLoading(true);
      const response = await movieApiClient.getMovieList();
      if ("message" in response) {
        setFetchError(response);
      } else {
        setMovieList(response.results);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getMovies();
  }, []);

  if(loading){
    return (
      <MovieListContainer>
        <LoadingIndicator aria-live="polite" aria-busy={loading} data-testid="main-movie-list-loading"/>
      </MovieListContainer>
    );
  }


  if(error){
    return (
      <MovieListContainer>
        <ErrorMessage aria-live="polite" data-testid="main-movie-list-error">{error.message}</ErrorMessage>
      </MovieListContainer>
    );
  }

  return (
    <MovieListContainer>
      {!error && !loading && (
        <MovieCardListWrapper role="list">
          {movieList && movieList.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </MovieCardListWrapper>
      )}
    </MovieListContainer>
  );
}

const MovieCardListWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: 0 auto;

  @media (max-width: var(--breakpoint-lg)) {
    flex-direction: row;
  }

  @media (max-width: var(--breakpoint-md)) {
    flex-direction: row;
  }

  @media (max-width: var(--breakpoint-sm)) {
    flex-direction: column;
  }
`;

const MovieListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
