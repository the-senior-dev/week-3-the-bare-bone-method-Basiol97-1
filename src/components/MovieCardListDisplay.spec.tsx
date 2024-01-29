import React from "react";
import "@testing-library/jest-dom/extend-expect";

import { render } from "../utils/test/testUtils";
import MovieCardListDisplay from "./MovieCardListDisplay";
import { screen } from "@testing-library/react";

describe("MovieCardListDisplay", () => {
  it("renders movies when movieList is provided", () => {
    const movieList = [
      {
        adult: false,
        original_title: "Movie 1",
        poster_path: "/path_to_poster",
        id: 1,
        release_date: "2021-09-01",
        title: "Movie 1",
        overview: "This is Movie 1",
        backdrop_path: "/path_to_backdrop",
        genre_ids: [1, 2, 3],
        original_language: "en",
        popularity: 10.5,
        video: false,
        vote_average: 8.0,
        vote_count: 100,
      },
    ];

    const { getByText } = render(
      <MovieCardListDisplay movieList={movieList} headingText="Upcoming" />
    );

    // Check if movies are rendered
    movieList.forEach((mov) => {
      // HINT: Example of a brittle test
      expect(
        screen.getByTestId(`simple-movie-card-${mov.id}`)
      ).toBeInTheDocument();
    });
  });

  it("renders an error message when error is provided", () => {
    const error = { message: "Failed to fetch", isError: true } as ApiError;

    const { getByText } = render(
      <MovieCardListDisplay error={error} headingText="Upcoming" />
    );

    // Check if error message is rendered
    expect(getByText("Failed to fetch")).toBeInTheDocument();
  });

  it("renders heading text when provided", () => {
    const headingText = "Popular";

    const { getByText } = render(
      <MovieCardListDisplay headingText={headingText} />
    );

    // Check if heading text is rendered
    expect(getByText(headingText)).toBeInTheDocument();
  });
});
