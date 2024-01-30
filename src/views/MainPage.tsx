import React, { useState, useEffect } from "react";
import movieApiClient from '../utils/apiClient';
import MovieList from "../components/MovieList";
import SearchBar from "../components/SearchBar";
import {PageContainer} from "../components/styled";
import TrendingNow from "../components/TrendingNow";
import TopRated from "../components/TopRatedMovies";
import UpcomingMovies from "../components/UpcomingMovies";
import Pagination from "../components/Pagination";

export default function MainPage() {

  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [error, setFetchError] = useState<ApiError | null>();
  const [loading, setLoading] = useState<boolean>(true);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  async function getMovies() {
    try {
      setLoading(true);
      const response = await movieApiClient.getMovieList(query, page);
      if ("message" in response) {
        setFetchError(response);
      } else {
        setMovieList(response.results);
      }
    } finally {
      setLoading(false);
    }
  }

  const handleSearch = (movieName: string) => {
    // reset page upon search
    setPage(() => 1)
    setQuery(() => movieName)
  };


  const updatePaginationPage = (action: string) => {
    switch (action) {
      case 'first':
        setPage(1);
        break;
      case 'previous':
        if (page > 1) setPage(prev => prev - 1);
        break;
      case 'next':
        setPage(prev => prev + 1);
        break;
      case 'final':
        setPage(5);
        break;
      default:
        return null;
    }
  };


  useEffect(() => {
    getMovies();
  }, [query, page]);


  return (
    <PageContainer>
      <SearchBar handleSearch={handleSearch} />
      <MovieList movieList={movieList} error={error} loading={loading} />
      <Pagination currentPage={page} handleUpdatePage={updatePaginationPage} />
      <TrendingNow />
      <UpcomingMovies />
      <TopRated />
    </PageContainer>
  );
}
