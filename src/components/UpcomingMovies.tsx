import React, { useEffect, useState } from "react";

import movieApiClient from "../utils/apiClient";
import MovieSlider from "./MovieSlider";

export default function UpcomingMovies() {
  const [movieListUpcoming, setMovieListUpcoming] = useState<Movie[]>([]);
  const [error, setFetchError] = useState<ApiError | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const data = await movieApiClient.getMovieListUpcoming();
        if ("message" in data) {
          setFetchError({ message: data.message, isError: true });
        } else {
          setMovieListUpcoming(data.results);
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
      movieList={movieListUpcoming}
      headingText={"Upcoming"}
      error={error}
      loading={loading}
      listType={"upcoming"}
    />
  );
}

