import React, { useEffect, useState } from "react";
import styled from "styled-components";

import movieApiClient from "../utils/movieApiClient";
import { ApiError, isApiError, Movie } from "../utils/typesApi";
import SimpleMovieCard from "./SimpleMovieCard";

export default function TrendingNow() {
  const [movieListTrending, setMovieListTrending] = useState<Movie[] | null>();
  const [error, setFetchError] = useState<ApiError | null>();

  useEffect(() => {
    movieApiClient.getMovieListNowPlaying().then((data) => {
      if (isApiError(data)) {
        setFetchError(data);
      } else {
        setMovieListTrending(data.results);
      }
    });
  }, []);

  return (
    <div>
      <SectionHeading>Trending Now</SectionHeading>
      <TrendingContainer>
        {!error &&
          movieListTrending?.map((mov) => (
            <SimpleMovieCard movieData={mov} key={mov.id} />
          ))}
      </TrendingContainer>
      {error}
    </div>
  );
}

const SectionHeading = styled.h1`
  width: 100%;
  text-align: left;
  padding-left: 10px;
`;

const TrendingContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-left: 10px;
  padding-right: 10px;
`;
