import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import MovieList from "../components/MovieList";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import { PageContainer } from "../components/styled";
import TrendingNow from "../components/TrendingNow";
import Upcoming from "../components/Upcoming";
import { ApiError, Movie } from "../utils/typesApi";

import movieApiClient from "../utils/movieApiClient";
import { debounce, set } from "lodash";

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
  const [suggestions, setSuggestions] = useState<string[]>([]);

  async function getMovies() {
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
    setSuggestions([]);
  }

  const debouncedGetSuggestions = useCallback(
    debounce(async (searchText) => {
      const response = await movieApiClient.getMovieList(searchText);
      if ("message" in response) {
        setFetchError({
          message: "An error occurred while fetching the movies",
          isError: true,
        });
      } else {
        setSuggestions(response.results.map((movie) => movie.title));
      }
    }, 500), // 500ms debounce time
    []
  );


  useEffect(() => {
    getMovies();
    setSearchParams({ search: searchText, page: currentPage.toString() });
    setSuggestions([]);
    // restore scroll to top
    fieldRef.current?.scrollIntoView();
  }, [currentPage]);

  // updated state when location changes
  useEffect(() => {
    const searchInputParam = searchParams.get("search") || "Godfather";
    const currentPageParam = Number(searchParams.get("page")) || 1;
    setSearchText(searchInputParam);
    setCurrentPage(currentPageParam);
    setSuggestions([]);
  }, [location]);

  // set the page to 1 when a new search is triggered
  function onSearch() {
    getMovies();
    setCurrentPage(1);
    fieldRef.current?.scrollIntoView();
    setSuggestions([]);
  }

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchText(event.target.value);
    debouncedGetSuggestions(searchText);
  }

  return (
    <PageContainer ref={fieldRef}>
      <SearchBar
        onSearchCallback={onSearch}
        onChange={onChange}
        searchText={searchText}
        suggestions={suggestions}
        setSuggestions={setSuggestions}
        setSearchText={setSearchText}
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
