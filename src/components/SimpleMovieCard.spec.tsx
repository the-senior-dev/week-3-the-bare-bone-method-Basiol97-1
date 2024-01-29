import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter, useNavigate } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";

import SimpleMovieCard from "./SimpleMovieCard";
import movieApiClient from "../utils/movieApiClient";

jest.mock("../utils/movieApiClient", () => ({
  buildMoviePosterUrl: jest.fn(),
}));

// Arrange
const navigate = jest.fn();

jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom");

  return {
    ...originalModule,
    __esModule: true,
    useNavigate: jest.fn(() => navigate),
  };
});

beforeEach(() => jest.clearAllMocks());

describe("SimpleMovieCard", () => {
  const mockMovie: Movie = {
    adult: false,
    original_title: "Original Title",
    poster_path: "poster.jpg",
    id: 1,
    release_date: "2022-01-01",
    title: "Movie Title",
    overview: "Movie Overview",
    backdrop_path: "backdrop.jpg",
    genre_ids: [1, 2, 3],
    original_language: "en",
    popularity: 7.5,
    video: false,
    vote_average: 8.0,
    vote_count: 100,
  };

  beforeEach(() => {
    (movieApiClient.buildMoviePosterUrl as jest.Mock).mockReturnValue(
      "http://example.com/poster.jpg"
    );
  });

  test("should render movie card with correct image", () => {
    render(
      <BrowserRouter>
        <SimpleMovieCard movieData={mockMovie} dataCy="movie-card" />
      </BrowserRouter>
    );

    // Act
    const movieImage = screen.getByTestId(`simple-movie-card-${mockMovie.id}`);

    // Assert
    expect(movieImage).toBeInTheDocument();
    expect(useNavigate).toHaveBeenCalledTimes(1);

    expect(movieImage).toHaveAttribute("src", "http://example.com/poster.jpg");
    expect(movieImage).toHaveAttribute("height", "174");
  });

  test("should navigate to movie details on card click", async () => {
    const user = userEvent.setup();

    render(
      <BrowserRouter>
        <SimpleMovieCard movieData={mockMovie} dataCy="movie-card" />
      </BrowserRouter>
    );

    // Act
    const movieImage = screen.getByTestId(`simple-movie-card-${mockMovie.id}`);

    await user.click(movieImage);

    // Assert
    // expect(useNavigate).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith(`/movie/${mockMovie.id}`);
  });
});
