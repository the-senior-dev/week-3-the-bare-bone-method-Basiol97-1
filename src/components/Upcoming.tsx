import React, { useEffect, useState } from "react";
import movieApiClient from "../utils/movieApiClient";
import { ApiError, isApiError, Movie } from "../utils/typesApi";
import MovieListCardDisplay from "./MovieCardListDisplay";

export default function Upcoming() {
  const [movieListUpcoming, setMovieListUpcoming] = useState<Movie[] | null>();
  const [error, setFetchError] = useState<ApiError | null>();

  useEffect(() => {
    movieApiClient.getMovieListUpcoming().then((data) => {
      if (isApiError(data)) {
        setFetchError(data);
      } else {
        setMovieListUpcoming(data.results);
      }
    });
  }, []);

  return (
    <MovieListCardDisplay
      movieList={movieListUpcoming}
      headingText={"Trending Now"}
      error={error}
    />
  );
}
