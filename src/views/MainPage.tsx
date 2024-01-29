import React from "react";
import MovieList from "../components/MovieList";
import SearchBar from "../components/SearchBar";
import PageContainer from "../components/styled/PageContainer";
import TrendingNow from "../components/TrendingNow";

export default function MainPage() {
  return (
    <PageContainer>
      <SearchBar />
      <MovieList />
      <TrendingNow />
    </PageContainer>
  );
}
