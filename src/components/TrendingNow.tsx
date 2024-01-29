import React, { useEffect, useState } from "react";
import styled from "styled-components";

import movieApiClient from "../utils/apiClient";
import SimpleMovieCard from "./SimpleMovieCard";
import { ErrorMessage, PageSection, SectionTitle } from "./styled";
import LoadingIndicator from "./styled/LoadingIndicator";

export default function TrendingNow() {
  const [movieListTrending, setMovieListTrending] = useState<Movie[] | null>(
    []
  );
  const [error, setFetchError] = useState<ApiError | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const data = await movieApiClient.getMovieListNowPlaying();
        if ("message" in data) {
          setFetchError({ message: data.message, isError: true });
        } else {
          setMovieListTrending(data.results);
        }
      } catch (err) {
        setFetchError({ message: "An error occured.", isError: true });
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <PageSection aria-labelledby="trending-movies-now-heading">
        <SectionTitle>Trending Now</SectionTitle>
        <TrendingContainer>
          <LoadingIndicator data-testid="trending-now-movies-loading" />
        </TrendingContainer>
      </PageSection>
    );
  }

  if (error) {
    return (
      <PageSection aria-labelledby="trending-movies-now-heading">
        <SectionTitle>Trending Now</SectionTitle>
        <TrendingContainer>
          <ErrorMessage
            data-testid="trending-movies-error-message"
            aria-live="polite"
          >
            {error.message}
          </ErrorMessage>
        </TrendingContainer>
      </PageSection>
    );
  }

  return (
    <PageSection aria-labelledby="trending-movies-now-heading">
      <SectionTitle>Trending Now</SectionTitle>
      <TrendingContainer
        data-testid={"trending-movies-container"}
        aria-label="List of trending movies"
        role="list"
      >
        {movieListTrending?.map((mov) => (
          <SimpleMovieCard
            data-testid={`trending-movies-card-${mov.id}`}
            movie={mov}
            key={mov.id}
          />
        ))}
      </TrendingContainer>
    </PageSection>
  );
}

const TrendingContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  overflow: scroll;
  max-height: 200px;
  -ms-overflow-style: none;
  scrollbar-width: none;
  padding-bottom: 20px;
  ::-webkit-scrollbar {
    display: none;
  }
`;
