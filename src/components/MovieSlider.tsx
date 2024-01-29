import React from "react";

import SimpleMovieCard from "./SimpleMovieCard";
import LoadingIndicator from "./styled/LoadingIndicator";

import {
  ErrorMessage,
  MovieSliderContainer,
  PageSection,
  SectionTitle,
} from "./styled";

interface MovieSliderProps {
  movieList?: Movie[];
  error?: ApiError | null;
  headingText: string;
  listType?: "upcoming" | "trending" | "top-rated";
  loading?: boolean;
}

export default function MovieSlider({
  movieList,
  error,
  headingText,
  listType,
  loading,
}: MovieSliderProps) {
  if (loading) {
    return (
      <PageSection aria-labelledby={`${listType}-movies-heading`}>
        <SectionTitle>{headingText}</SectionTitle>
        <MovieSliderContainer>
          <LoadingIndicator data-testid={`${listType}-movies-loading`} />
        </MovieSliderContainer>
      </PageSection>
    );
  }

  if (error) {
    return (
      <PageSection aria-labelledby={`${listType}-movies-now-heading`}>
        <SectionTitle>{headingText}</SectionTitle>
        <MovieSliderContainer>
          <ErrorMessage
            data-testid={`${listType}-movies-error-message`}
            aria-live="polite"
          >
            {error.message}
          </ErrorMessage>
        </MovieSliderContainer>
      </PageSection>
    );
  }

  return (
    <PageSection aria-labelledby={`${listType}-movies-heading}`}>
      <SectionTitle>{headingText}</SectionTitle>
      <MovieSliderContainer
        data-testid={`${listType}-movies-container`}
        aria-label={`List of ${movieList} movies`}
        role="list"
      >
        {movieList?.map((movie) => (
          <SimpleMovieCard
            movie={movie}
            key={movie.id}
            data-testid={`${listType}-movies-card-${movie.id}`}
          />
        ))}
      </MovieSliderContainer>
    </PageSection>
  );
}
