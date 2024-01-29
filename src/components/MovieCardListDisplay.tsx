import React from "react";
import SimpleMovieCard from "./SimpleMovieCard";
import { MovieSliderContainer } from "./styled";
import SectionHeading from "./styled/SectionHeading";

interface MovieListCardDisplayProps {
  movieList?: Movie[] | undefined | null;
  error?: ApiError | null;
  headingText: string;
  listType?: "upcoming" | "trending";
}

export default function MovieCardListDisplay({
  movieList,
  error,
  headingText,
  listType
}: MovieListCardDisplayProps) {
  return (
    <div>
      <SectionHeading>{headingText}</SectionHeading>
      <MovieSliderContainer data-cy={`${listType}-movie-container`}>
        {!error &&
          movieList?.map((mov) => (
            <SimpleMovieCard movieData={mov} key={mov.id} dataCy={`${listType}-movie-card`}/>
          ))}
      </MovieSliderContainer>
      {error && <p data-cy={`${listType}-movie-error-message`}>{error?.message}</p>}
    </div>
  );
}
