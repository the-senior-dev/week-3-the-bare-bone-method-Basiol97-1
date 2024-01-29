import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import movieApiClient from "../utils/movieApiClient";

interface SimpleMovieCardProps {
  movieData: Movie;
  dataCy: string;
}

export default function SimpleMovieCard({ movieData, dataCy = "simple-movie-card" }: SimpleMovieCardProps) {
  const navigate = useNavigate();

  const onCardClick = (event: any) => {
    navigate(`/movie/${movieData.id}`);
  };

  return (
    <SimpleMovieCardContainer data-cy={dataCy}>
      <SimpleMovieCardImage
        src={movieApiClient.buildMoviePosterUrl(movieData.poster_path)}
        height="174"
        onClick={onCardClick}
        data-testid={`simple-movie-card-${movieData.id}`}
      ></SimpleMovieCardImage>
    </SimpleMovieCardContainer>
  );
}

const SimpleMovieCardContainer = styled.div`
  margin-left: 2px;
  margin-right: 2px;
`;

const SimpleMovieCardImage = styled.img`
  &:hover {
    cursor: pointer;
  }
`;
