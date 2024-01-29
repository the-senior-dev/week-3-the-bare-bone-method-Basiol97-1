import React, { useEffect, useState } from "react";
import styled from "styled-components";

import movieApiClient from "../utils/apiClient";
import SimpleMovieCard from "./SimpleMovieCard";
import { PageSection, SectionTitle, ErrorMessage } from "./styled";
import LoadingIndicator from "./styled/LoadingIndicator";

interface SimilarMoviesProps {
  movieId: string;
}

export default function SimilarMovies({ movieId }: SimilarMoviesProps) {
  const [moviesSimilar, setMovieSimilar] = useState<Movie[] | null>([]);
  const [error, setFetchError] = useState<ApiError | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const data = await movieApiClient.getMovieSimilar(movieId);
        if ("message" in data) {
          setFetchError({ message: data.message, isError: true });
        } else {
          setMovieSimilar(data.results);
        }
      } catch (err) {
        setFetchError({ message: "An error occured.", isError: true });
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [movieId]);

  return (
    <PageSection aria-labelledby="similar-movies-heading">
      <SectionTitle>Similar Movies</SectionTitle>
      <SimilarMoviesContainer
        data-test-id={"similar-movies-container"}
        aria-label="List of top rated movies"
        role="list"
      >
        {loading ? (
          <LoadingIndicator data-testid="similar-movies-loading" /> // Loading indicator
        ) : (
          !error &&
          moviesSimilar?.map((movie) => (
            <SimpleMovieCard
              data-testid={`similar-movies-card-${movie.id}`}
              movie={movie}
              key={movie.id}
            />
          ))
        )}
      </SimilarMoviesContainer>
      {error && (
        <ErrorMessage data-testid="similar-movies-error-message" aria-live="polite">
          {error?.message}
        </ErrorMessage>
      )}
    </PageSection>
  );
}


const SimilarMoviesContainer = styled.div`
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
