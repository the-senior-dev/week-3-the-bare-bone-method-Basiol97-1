import React from "react";
import _ from "lodash";
import moment from "moment";
import styled from "styled-components";
import chroma from "chroma-js";
import { Link } from "react-router-dom";

import movieApiClient from "../utils/apiClient";
import settings from "../settings";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  function plotShorten(text: string, length = 250) {
    const shortText = _.take(text.split(""), length).join("");
    return shortText + "...";
  }

  return (
    <MovieCardContainer
      data-testid={`movie-card-container-${movie.id}`}
      to={`/movie/${movie.id}`}
      role="listitem link"
    >
      <img
        height="238"
        alt={`${movie.title} poster`}
        src={movieApiClient.buildMoviePosterUrl(movie.poster_path)}
      ></img>
      <MovieCardSummary>
        <MovieTitle data-testid={`movie-card-title-${movie.id}`}>
          {movie.title}
        </MovieTitle>
        <ReleaseDate>
          Release Date: {moment(movie.release_date).format("MMM Do, YYYY")}
        </ReleaseDate>
        <MoviePlot>Plot: {plotShorten(movie.overview)}</MoviePlot>
      </MovieCardSummary>
    </MovieCardContainer>
  );
}

const ReleaseDate = styled.p`
  margin-bottom: 0.4em;
  margin-top: 0.4em;
  font-size: 0.9em;
  font-weight: 300;
  color: #2d3436;
`;

const MovieCardSummary = styled.div`
  padding: 10px;
  text-decoration: none;
  color: #2d3436;
`;

const MovieTitle = styled.h2`
  color: #2d3436;
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

const MoviePlot = styled.p`
  color: #636e72;
  text-decoration: none;
  height: 100px;
  overflow: hidden;
  font-size: 0.8em;
  // white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: 300;
`;

const MovieCardContainer = styled(Link)`
  display: flex;
  text-decoration: none;
  width: calc(50% - 20px);
  border: solid 1px ${chroma(settings.colors.foreground).alpha(0.1).css()};
  margin-right: 10px;
  margin-left: 10px;
  margin-bottom: 10px;
  box-sizing: border-box;
  height: 240px;
  background-color: ${settings.colors.backgroundSecondary};
  box-shadow: 0 2px 8px ${settings.colors.shadow};
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
    z-index: 1;
    transform: scale(1.005);
    box-shadow: 0 2px 8px ${settings.colors.shadow};
    border-color: ${settings.colors.info};
  }
`;
