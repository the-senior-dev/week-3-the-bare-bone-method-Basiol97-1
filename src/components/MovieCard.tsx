import React from "react";
import _ from "lodash";
import moment from "moment";
import { Link } from "react-router-dom";
import styled from "styled-components";
import chroma from "chroma-js";
import { useSelector } from "react-redux";

import { RootState } from "../store/redux/store";
import movieApiClient from "../utils/apiClient";
import settings from "../settings";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const theme = useSelector((state: RootState) => state.themeReducer.theme);

  function plotShorten(text: string, length = 250) {
    const shortText = _.take(text.split(""), length).join("");
    return shortText + "...";
  }

  return (
    <MovieCardContainer
      data-testid={`movie-card-container-${movie.id}`}
      data-cy={`movie-card-container-${movie.id}`}
      to={`/movie/${movie.id}`}
      $backgroundColor={theme.background_secondary}
      $borderColor={theme.background_secondary}
    >
      <img
        height="238"
        alt={`${movie.title} poster`}
        src={movieApiClient.buildMoviePosterUrl(movie.poster_path)}
      ></img>
      <MovieCardSummary>
        <MovieTitle $color={theme.foreground} data-testid={`movie-card-title-${movie.id}`}>
          {movie.title}
        </MovieTitle>
        <ReleaseDate $color={theme.foreground}>
          Release Date: {moment(movie.release_date).format("MMM Do, YYYY")}
        </ReleaseDate>
        <MoviePlot $color={theme.foreground}>Plot: {plotShorten(movie.overview)}</MoviePlot>
      </MovieCardSummary>
    </MovieCardContainer>
  );
}

interface ReleaseDateProps {
  $color: string;
}

const ReleaseDate = styled.p<ReleaseDateProps>`
  margin-bottom: 0.4em;
  margin-top: 0.4em;
  font-size: 0.9em;
  font-weight: 300;
  color: ${(props) => props.$color};
`;

const MovieCardSummary = styled.div`
  padding: 10px;
  text-decoration: none;
  color: ${(props) => props.color};
`;

interface MovieTitleProps {
  $color: string;
}

const MovieTitle = styled.h2<MovieTitleProps>`
  color: ${(props) => props.$color};
  text-decoration: none;
  margin-bottom: 0.4em;
  margin-top: 0.4em;
  font-size: 1em;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  max-width: 100%;
`;

interface MoviePlotProps {
  $color: string;
}

const MoviePlot = styled.p<MoviePlotProps>`
  color: ${(props) => props.$color};
  text-decoration: none;
  height: 100px;
  overflow: hidden;
  font-size: 0.8em;
  text-overflow: ellipsis;
  font-weight: 300;
`;

interface MovieCardContainerProps {
  $backgroundColor: string;
  $borderColor?: string;
}

const MovieCardContainer = styled(Link)<MovieCardContainerProps>`
  display: flex;
  text-decoration: none;
  width: calc(50% - 20px);
  border: solid 1px ${(props) => (props.$borderColor ? chroma(props.$borderColor).alpha(0.4).hex() : "transparent")};
  margin-right: 10px;
  margin-left: 10px;
  margin-bottom: 10px;
  box-sizing: border-box;
  height: 240px;
  background-color: ${(props) => props.$backgroundColor};
  box-shadow: 0 2px 8px rgba(0,0,0,.1);
  border-radius: 4px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;

  @media (max-width: ${settings.breakpoints.lg}) {
    width: calc(50% - 20px);
  }
  @media (max-width: ${settings.breakpoints.lg}) {
    width: calc(100% - 20px);
  }
  @media (max-width: ${settings.breakpoints.md}) {
    width: calc(100% - 20px);
  }

  &:hover {
    cursor: pointer;
    transform: scale(1.05);
    border-color: ${(props) => (props.$borderColor ? chroma(props.$borderColor).alpha(0.6).hex() : "transparent")};
    z-index: 1;
    transform: scale(1.005);
    box-shadow: 0 2px 8px ${settings.colors.shadow};
  }
`;
