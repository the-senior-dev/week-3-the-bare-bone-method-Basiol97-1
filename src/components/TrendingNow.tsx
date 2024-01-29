import React, { useEffect, useState } from "react";

import movieApiClient from "../utils/movieApiClient";
import MovieCardListDisplay from "./MovieCardListDisplay";

export default function TrendingNow() {
  const [movieListTrending, setMovieListTrending] = useState<Movie[]>();
  const [error, setFetchError] = useState<ApiError | null>();

  useEffect(() => {
    movieApiClient.getMovieListNowPlaying().then((data) => {
      if ("message" in data) {
        setFetchError({ message: data.message, isError: true });
      } else {
        setMovieListTrending(data.results);
      }
    });
  }, []);

  return (
    <MovieCardListDisplay
      movieList={movieListTrending}
      headingText={"Trending Now"}
      error={error}
      listType={"trending"}
    />
  );
}
