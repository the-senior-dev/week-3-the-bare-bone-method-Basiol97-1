import React, { useEffect, useState } from "react";
import styled from "styled-components";
import movieApiClient from "../utils/movieApiClient";
import { ApiError, isApiError, Movie } from "../utils/typesApi";
import MovieCard from "./MovieCard";

export default function MovieList() {
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [error, setFetchError] = useState<ApiError | null>();

  async function getMovies() {
    const response = await movieApiClient.getMovieList();
    if (isApiError(response)) {
      setFetchError(response);
    } else {
      setMovieList(response.results);
    }
  }

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <MovieListContainer>
      <MovieCardListWrapper>
        {movieList.map((movie) => {
          return <MovieCard movie={movie} key={movie.id} />;
        })}
      </MovieCardListWrapper>
      {error?.message}
    </MovieListContainer>
  );
}

const MovieCardListWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const MovieListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
