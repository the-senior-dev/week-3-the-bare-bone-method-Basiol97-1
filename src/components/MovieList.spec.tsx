import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { act } from "react-dom/test-utils";
import { screen, waitFor } from "@testing-library/react";

import { render } from "../utils/test/testUtils"; // cusom render function
import movieApiClient from "../utils/apiClient";
import MovieList from "./MovieList";

jest.mock("../utils/apiClient", () => ({
  getMovieList: jest.fn(),
  buildMoviePosterUrl: jest.fn(),
}));

const fullMovieMock = {
  adult: false,
  original_title: "The Original Movie",
  poster_path: "/path/to/poster.jpg",
  id: 1234,
  release_date: "2023-06-30",
  title: "The Movie",
  overview: "This is a movie",
  backdrop_path: "/path/to/backdrop.jpg",
  genre_ids: [1, 2, 3],
  original_language: "en",
  popularity: 7.8,
  video: false,
  vote_average: 8.5,
  vote_count: 100,
};

describe("MovieList", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("displays movie cards when API call is successful", async () => {
    // Arrange
    const movieList = [fullMovieMock];
    (
      movieApiClient.getMovieList as jest.MockedFunction<
        typeof movieApiClient.getMovieList
      >
    ).mockResolvedValue({
      results: movieList,
      total_pages: 1,
      page: 1,
      total_results: 1,
    });

    // Act
    render(<MovieList />);

    // Assert
    await waitFor(() => {
      expect(screen.getByText("The Movie")).toBeInTheDocument();
    });
  });

  test("displays error message when API call fails", async () => {
    // Arrange
    const errorMessage = "Failed to fetch movies";
    (
      movieApiClient.getMovieList as jest.MockedFunction<
        typeof movieApiClient.getMovieList
      >
    ).mockResolvedValue({ message: errorMessage, isError: true });

    // Act
    render(<MovieList />);

    // Assert
    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  test("fetches movies on component mount", async () => {
    // Arrange
    (
      movieApiClient.getMovieList as jest.MockedFunction<
        typeof movieApiClient.getMovieList
      >
    ).mockResolvedValue({
      results: [],
      total_pages: 0,
      page: 0,
      total_results: 0,
    });

    // Act
    await act(async () => {
      render(<MovieList />);
    });

    // Assert
    await waitFor(() => {
      expect(movieApiClient.getMovieList).toHaveBeenCalledTimes(1);
    });
  });

  test("does not display movie cards initially", async () => {
    // Arrange
    (
      movieApiClient.getMovieList as jest.MockedFunction<
        typeof movieApiClient.getMovieList
      >
    ).mockResolvedValue({
      results: [],
      total_pages: 0,
      page: 0,
      total_results: 0,
    });

    // Act
    await act(async () => {
      render(<MovieList />);
    });
    // Assert
    expect(screen.queryByTestId("movie-card")).toBeNull();
  });

  test("displays full movie details", async () => {
    // Arrange
    (
      movieApiClient.getMovieList as jest.MockedFunction<
        typeof movieApiClient.getMovieList
      >
    ).mockResolvedValue({
      results: [fullMovieMock],
      total_pages: 1,
      page: 1,
      total_results: 1,
    });

    // Act
    await act(async () => {
      render(<MovieList />);
    });

    expect(await screen.findByText("The Movie")).toBeInTheDocument();

    // Assert
  });
});
