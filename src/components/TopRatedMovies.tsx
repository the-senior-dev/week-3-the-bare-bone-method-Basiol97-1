import React, { useEffect, useState } from "react";

import movieApiClient from "../utils/apiClient";
import MovieSlider from "./MovieSlider";

export default function TopRatedMovies() {
  const [movieListTopRated, setMovieListTopRated] = useState<Movie[]>(
    []
  );
  const [error, setFetchError] = useState<ApiError | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const data = await movieApiClient.getMovieListTopRated();
        if ("message" in data) {
          setFetchError({ message: data.message, isError: true });
        } else {
          setMovieListTopRated(data.results);
        }
      } catch (err) {
        setFetchError({ message: "An error occured.", isError: true });
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <MovieSlider
      movieList={movieListTopRated}
      headingText={"Top Rated"}
      error={error}
      loading={loading}
      listType={"top-rated"}
    />
  );
}

