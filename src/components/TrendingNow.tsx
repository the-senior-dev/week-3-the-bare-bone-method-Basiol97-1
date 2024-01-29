import React, { useEffect, useState } from "react";
import movieApiClient from "../utils/movieApiClient";
import { ApiError, isApiError, Movie } from "../utils/typesApi";
import MovieListCardDisplay from "./MovieCardListDisplay";

export default function TrendingNow() {
  const [movieListTrending, setMovieListTrending] = useState<Movie[] | null>();
  const [error, setFetchError] = useState<ApiError | null>();

  useEffect(() => {
    movieApiClient.getMovieListNowPlaying().then((data) => {
      if (isApiError(data)) {
        setFetchError(data);
      } else {
        setMovieListTrending(data.results);
      }
    });
  }, []);

  return (
    <MovieListCardDisplay
      movieList={movieListTrending}
      headingText={"Trending Now"}
      error={error}
    />
  );
}
