import React from "react";
import _ from "lodash";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import movieApiClient from "../utils/movieApiClient";
import { Movie } from "../utils/typesApi";
import MovieCardContainer from "./styled/MovieCardContainer";
import { RootState } from "../store/redux/store";
import { useSelector } from "react-redux";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const theme = useSelector((state: RootState) => state.themeReducer.theme);
  const navigate = useNavigate();

  const onCardClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  function plotShorten(text: string, length = 250) {
    const shortText = _.take(text.split(""), length).join("");
    return shortText + "...";
  }

  return (
    <MovieCardContainer
      data-testid={`movie-card-container-${movie.id}`}
      data-cy={`movie-card-container-${movie.id}`}
      onClick={onCardClick}
    >
      <img
        height="238"
        alt="movie-poster"
        src={movieApiClient.buildMoviePosterUrl(movie.poster_path)}
      ></img>
      <MovieCardSummary>
        <MovieTitle
          data-testid={`movie-card-title-${movie.id}`}
          color={theme.foreground}
        >
          {movie.title}
        </MovieTitle>
        <MovieDate color={theme.foreground}>
          Release Date: {moment(movie.release_date).format("MMM Do YY")}
        </MovieDate>
        <MoviePlot color={theme.foreground}>
          Plot: {plotShorten(movie.overview)}
        </MoviePlot>
      </MovieCardSummary>
    </MovieCardContainer>
  );
}

const MovieCardSummary = styled.div`
  padding: 10px;
  text-decoration: none;
  color: ${(props) => props.color};
`;

const MovieTitle = styled.h2`
  color: ${(props) => props.color};
`;

const MoviePlot = styled.p`
  color: ${(props) => props.color};
  text-decoration: none;
  height: 100px;
  overflow: hidden;
  font-size: 0.8em;
  // white-space: nowrap;
  text-overflow: ellipsis;
`;

const MovieDate = styled.p`
  color: ${(props) => props.color};
`;
