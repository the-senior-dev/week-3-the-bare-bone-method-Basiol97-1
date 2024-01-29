import React, { useEffect, useState } from "react";
import styled from "styled-components";

import SimpleMovieCard from "./SimpleMovieCard";
import movieApiClient from "../utils/apiClient";
import { ErrorMessage, PageSection, SectionTitle } from "./styled";
import LoadingIndicator from "./styled/LoadingIndicator";

export default function UpcomingMovies() {
  const [movieListUpcoming, setMovieListUpcoming] = useState<Movie[] | null>(
    []
  );
  const [error, setFetchError] = useState<ApiError | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const data = await movieApiClient.getMovieListUpcoming();
        if ("message" in data) {
          setFetchError({ message: data.message, isError: true });
        } else {
          setMovieListUpcoming(data.results);
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
      <PageSection aria-labelledby="upcoming-movies-now-heading">
        <SectionTitle>Upcoming Movies</SectionTitle>
        <UpcomingContainer>
          <LoadingIndicator data-testid="upcoming-movies-loading" />
        </UpcomingContainer>
      </PageSection>
    );
  }

  if (error) {
    return (
      <PageSection aria-labelledby="upcoming-movies-now-heading">
        <SectionTitle>Upcoming Movies</SectionTitle>
        <UpcomingContainer>
          <ErrorMessage
            data-testid="upcoming-movies-error-message"
            aria-live="polite"
          >
            {error.message}
          </ErrorMessage>
        </UpcomingContainer>
      </PageSection>
    );
  }

  return (
    <PageSection aria-labelledby="upcoming-movies-now-heading">
      <SectionTitle>Upcoming Movies</SectionTitle>
      <UpcomingContainer
        data-testid={"upcoming-movies-container"}
        aria-label="List of upcoming movies"
        role="list"
      >
        {movieListUpcoming?.map((mov) => (
          <SimpleMovieCard
            data-testid={`upcoming-movies-card-${mov.id}`}
            movie={mov}
            key={mov.id}
          />
        ))}
      </UpcomingContainer>
    </PageSection>
  );
}

const UpcomingContainer = styled.div`
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
