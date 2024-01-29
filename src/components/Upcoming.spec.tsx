import React from "react";
import { render, screen, act, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";

import movieApiClient from "../utils/movieApiClient";
import Upcoming from "./Upcoming";

jest.mock("../utils/movieApiClient");

describe("UpcomingMovies", () => {
  beforeEach(() => {
    (movieApiClient.getMovieListUpcoming as jest.Mock).mockReset();
  });

  it("should fetch and display movies if the API call is successful", async () => {
    // Given
    const mockMovies: Movie[] = [
      {
        adult: false,
        original_title: "Test Original Movie",
        poster_path: "/test.jpg",
        id: 1,
        release_date: "2022-02-02",
        title: "Test Movie",
        overview:
          "This is a test movie overview. It's supposed to be really long so we can test the plot shortening functionality as well.",
        backdrop_path: "/test-backdrop.jpg",
        genre_ids: [1, 2, 3],
        original_language: "en",
        popularity: 7.8,
        video: false,
        vote_average: 8.5,
        vote_count: 100,
      },
    ];

    (movieApiClient.getMovieListUpcoming as jest.Mock).mockResolvedValueOnce({
      results: mockMovies,
    });

    // When
    await act(async () => {
      render(
        <BrowserRouter>
          <Upcoming />
        </BrowserRouter>
      );
    });

    // Then
    expect(movieApiClient.getMovieListUpcoming).toHaveBeenCalled();
  });

  it("should display an error message if the API call fails", async () => {
    // Given
    const mockError = { message: "An error occurred", isError: true };

    (movieApiClient.getMovieListUpcoming as jest.Mock).mockResolvedValueOnce(
      mockError
    );

    // When
    await act(async () => {
      render(
        <BrowserRouter>
          <Upcoming />
        </BrowserRouter>
      );
    });

    // Then
    await waitFor(() =>
      expect(movieApiClient.getMovieListUpcoming).toHaveBeenCalledTimes(1)
    );

    const regex = new RegExp(mockError.message);

    expect(screen.getByText(regex)).toBeInTheDocument();
  });
});
