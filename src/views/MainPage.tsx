import React, { useState, useEffect } from "react";
import movieApiClient from '../utils/apiClient';
import MovieList from "../components/MovieList";
import SearchBar from "../components/SearchBar";
import {PageContainer} from "../components/styled";
import TrendingNow from "../components/TrendingNow";
import TopRated from "../components/TopRatedMovies";
import UpcomingMovies from "../components/UpcomingMovies";

export default function MainPage() {

  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [error, setFetchError] = useState<ApiError | null>();
  const [loading, setLoading] = useState<boolean>(true);
  const [query, setQuery] = useState("star");

  async function getMovies() {
    try {
      setLoading(true);
      const response = await movieApiClient.getMovieList(query);
      if ("message" in response) {
        setFetchError(response);
      } else {
        setMovieList(response.results);
      }
    } finally {
      setLoading(false);
    }
  }

  const handleSearch = (movieName: string) => setQuery(movieName);


  useEffect(() => {
    getMovies();
  }, [query]);


  return (
    <PageContainer>
      <SearchBar handleSearch={handleSearch} />
      <MovieList movieList={movieList} error={error} loading={loading} />
      <TrendingNow />
      <UpcomingMovies />
      <TopRated />
    </PageContainer>
  );
}
