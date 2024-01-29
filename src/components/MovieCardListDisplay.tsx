import React from "react";
import { ApiError, Movie } from "../utils/typesApi";
import SimpleMovieCard from "./SimpleMovieCard";
import { MovieSliderContainer } from "./styled";
import SectionHeading from "./styled/SectionHeading";

interface MovieListCardDisplayProps {
  movieList: Movie[] | null | undefined;
  error: ApiError | null | undefined;
  headingText: string;
}

export default function MovieListCardDisplay({
  movieList,
  error,
  headingText,
}: MovieListCardDisplayProps) {
  return (
    <div>
      <SectionHeading>{headingText}</SectionHeading>
      <MovieSliderContainer>
        {!error &&
          movieList?.map((mov) => (
            <SimpleMovieCard movieData={mov} key={mov.id} />
          ))}
      </MovieSliderContainer>
      <p>{error?.message}</p>
    </div>
  );
}
