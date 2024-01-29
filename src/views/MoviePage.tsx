import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import MovieReviewList from "../components/movieReviews/MovieReviewList";
import PageContainer from "../components/styled/PageContainer";
import movieApiClient from "../utils/movieApiClient";
import { ApiError, FullMovieResponse, isApiError } from "../utils/typesApi";

export default function MoviePage() {
  const { id } = useParams() as { id: string };
  const [error, setFetchError] = useState<ApiError | null>();

  const [movieData, setMovieData] = useState<FullMovieResponse | null>();

  useEffect(() => {
    movieApiClient.getMovieDetail(id).then((data) => {
      if (isApiError(data)) {
        setFetchError(error);
      } else {
        setMovieData(data);
      }
    });
  }, []);

  return (
    <PageContainer>
      <div style={{ display: "flex" }}>
        {movieData ? (
          <MoviePoster
            src={movieApiClient.buildMoviePosterUrl(movieData?.poster_path)}
          ></MoviePoster>
        ) : (
          <MoviePoster
            src={movieApiClient.buildMoviePosterUrl("")}
          ></MoviePoster>
        )}
        <MovieDetailWrapper>
          <h1>{movieData?.title}</h1>
          <p>Tagline: {movieData?.tagline}</p>
          <p>Rating: {movieData?.vote_average}</p>
          <p>Plot: {movieData?.overview}</p>
        </MovieDetailWrapper>
      </div>
      <Link to="/">Go Back</Link>
      <MovieReviewList movieId={id} />
    </PageContainer>
  );
}

const MoviePoster = styled.img`
  width: 30%;
  margin-right: 40px;
  margin-bottom: 40px;
  margin-top: 40px;
`;

const MovieDetailWrapper = styled.div`
  padding: 20px;
`;
