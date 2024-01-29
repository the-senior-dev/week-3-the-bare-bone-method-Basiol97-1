import React from "react";
import styled from "styled-components";
import { ApiError, Movie } from "../utils/typesApi";
import MovieCard from "./MovieCard";

interface MovieListProps {
  movieList: Movie[];
  error?: ApiError | null;
}

export default function MovieList({ movieList, error }: MovieListProps) {
  return (
    <MovieListContainer>
      <MovieCardListWrapper data-cy="movie-list">
        {movieList &&
          movieList.map((movie) => {
            return <MovieCard movie={movie} key={movie.id}/>;
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
