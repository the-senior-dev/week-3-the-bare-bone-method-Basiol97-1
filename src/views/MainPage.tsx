import React from "react";
import MovieList from "../components/MovieList";
import SearchBar from "../components/SearchBar";
import {PageContainer} from "../components/styled";
import TrendingNow from "../components/TrendingNow";
import TopRated from "../components/TopRatedMovies";

export default function MainPage() {
  return (
    <PageContainer>
      <SearchBar />
      <MovieList />
      <TrendingNow />
      <TopRated />
    </PageContainer>
  );
}
