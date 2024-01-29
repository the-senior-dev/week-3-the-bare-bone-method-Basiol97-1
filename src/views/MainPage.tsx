import React, { ReactEventHandler, useEffect, useRef, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import MovieList from "../components/MovieList";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import { PageContainer } from "../components/styled";
import TrendingNow from "../components/TrendingNow";
import Upcoming from "../components/Upcoming";
import { ApiError, isApiError, Movie } from "../utils/typesApi";
import movieApiClient from "../utils/movieApiClient";

export default function MainPage() {
  // Getting the search params from the url
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchInputParam = searchParams.get("search") || "Godfather";
  const currentPageParam = Number(searchParams.get("page")) || 1;

  // scroll resotration
  const fieldRef = useRef<HTMLInputElement>(null);

  const [currentPage, setCurrentPage] = useState<number>(currentPageParam);
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [error, setFetchError] = useState<ApiError | null>();
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>(searchInputParam);

  async function getMovies() {
    const response = await movieApiClient.getMovieList(searchText, currentPage);
    if (isApiError(response)) {
      setFetchError(response);
    } else {
      setMovieList(response.results);
      setTotalPages(response.total_pages);
    }
  }

  useEffect(() => {
    getMovies();
    setSearchParams({ search: searchText, page: currentPage.toString() });
    // restore scroll to top
    fieldRef.current?.scrollIntoView();
  }, [currentPage]);

  // updated state when location changes
  useEffect(() => {
    const searchInputParam = searchParams.get("search") || "Godfather";
    const currentPageParam = Number(searchParams.get("page")) || 1;
    setSearchText(searchInputParam);
    setCurrentPage(currentPageParam);
  }, [location]);

  // set the page to 1 when a new search is triggered
  function onSearch() {
    getMovies();
    setCurrentPage(1);
    fieldRef.current?.scrollIntoView();
  }

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchText(event.target.value);
  }

  return (
    <PageContainer ref={fieldRef}>
      <SearchBar
        onSearchCallback={onSearch}
        searchText={searchText}
        onChange={onChange}
      />
      <MovieList movieList={movieList} error={error} />
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        lastPage={totalPages}
      />
      <TrendingNow />
      <Upcoming />
    </PageContainer>
  );
}
