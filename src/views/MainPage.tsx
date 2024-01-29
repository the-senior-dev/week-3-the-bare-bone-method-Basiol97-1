import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import MovieList from "../components/MovieList";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import { PageContainer } from "../components/styled";
import movieApiClient from "../utils/apiClient";
import TrendingNow from "../components/TrendingNow";
import Upcoming from "../components/UpcomingMovies";
import TopRated from "../components/TopRatedMovies";

export default function MainPage() {
  // Getting the search params from the url
  const [searchParams, setSearchParams] = useSearchParams();
  const searchInputParam = searchParams.get("search") || "Star Wars";
  const currentPageParam = Number(searchParams.get("page")) || 1;

  const [currentPage, setCurrentPage] = useState<number>(currentPageParam);
  const [searchText, setSearchText] = useState<string>(searchInputParam);

  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [error, setFetchError] = useState<ApiError | null>();
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(1);

  async function getMovies(searchText:string, currentPage:number) {
    // Set loading to true before the request starts
    setLoading(true);

    // Fetch the movies from the api
    const response = await movieApiClient.getMovieList(searchText, currentPage);
    if ("message" in response) {
      setFetchError({
        message: "An error ocurred while fetching the movies",
        isError: true,
      });
    } else {
      setMovieList(response.results);
      setTotalPages(response.total_pages);
    }

    // Set loading to false after the request is finished
    setLoading(false);

    // Update the url with the new search params
    setSearchParams({ search: searchText, page: currentPage.toString() });
  }

  // Fetch the movies when the component mounts
  useEffect(() => {
    getMovies(searchText, currentPage);
  }, []);

  
  function onSearchButtonClick() {
    setCurrentPage(1);
    getMovies(searchText, 1);
  }

  function onChangeSearchText(text: string) {
    setSearchText(text);
  }

  function onPageChange(page: number) {
    setCurrentPage(page);
    getMovies(searchText, page);
  }

  return (
    <PageContainer>
      <SearchBar onChange={onChangeSearchText} value={searchText} onButtonClick={onSearchButtonClick} />
      <MovieList movieList={movieList} error={error} loading={loading}/>
      <Pagination
        currentPage={currentPage}
        lastPage={totalPages}
        onPageChange={onPageChange}
      />
      <TrendingNow />
      <TopRated />
      <Upcoming/>
    </PageContainer>
  );
}
