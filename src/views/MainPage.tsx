import React from "react";
import MovieList from "../components/MovieList";
import SearchBar from "../components/SearchBar";
import {PageContainer} from "../components/styled";
import TrendingNow from "../components/TrendingNow";
import TopRated from "../components/TopRatedMovies";
import UpcomingMovies from "../components/UpcomingMovies";

export default function MainPage() {
  return (
    <PageContainer>
      <SearchBar />
      <MovieList />
      <TrendingNow />
      <UpcomingMovies />
      <TopRated />
    </PageContainer>
  );
}
