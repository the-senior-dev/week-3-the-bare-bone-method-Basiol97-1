import React from "react";
import { screen, waitFor } from "@testing-library/react";
import { render } from "../utils/test/testUtils";
import "@testing-library/jest-dom/extend-expect";
import UpcomingMovies from "./UpcomingMovies";
import movieApiClient from "../utils/apiClient";

jest.mock("../utils/apiClient");


interface ApiError {
  message: string;
  isError: boolean;
}

const mockMovies: Movie[] = [
  {
    adult: false,
    original_title: "Movie 1",
    poster_path: "/path/to/poster1.jpg",
    id: 1,
    release_date: "2022-01-01",
    title: "Movie 1",
    overview: "Overview of Movie 1",
    backdrop_path: "/path/to/backdrop1.jpg",
    genre_ids: [1, 2],
    original_language: "en",
    popularity: 7.5,
    video: false,
    vote_average: 8.5,
    vote_count: 200,
  },
];

const mockError: ApiError = { message: "An error occurred.", isError: true };

beforeEach(() => {
  (movieApiClient.getMovieListUpcoming as jest.Mock).mockClear();
});

describe("UpcomingMovies", () => {
  test("renders loading indicator initially", () => {
    render(<UpcomingMovies />);
    expect(screen.getByTestId("upcoming-movies-loading")).toBeInTheDocument();
  });

  test("displays loading indicator while fetching movies", async () => {
    (movieApiClient.getMovieListUpcoming as jest.Mock).mockResolvedValueOnce(
      new Promise(() => {})
    );
    render(<UpcomingMovies />);
    expect(screen.getByTestId("upcoming-movies-loading")).toBeInTheDocument();
  });

  test("renders movies after successful fetch", async () => {
    const apiSpy = (movieApiClient.getMovieListUpcoming as jest.Mock).mockResolvedValueOnce(new Promise((resolve) => resolve({ results: mockMovies })));
    render(<UpcomingMovies />);
    await waitFor(() => {
      expect(apiSpy).toHaveBeenCalled();
    });
    await waitFor(() => {
      mockMovies.forEach((movie) => {
        expect(
          screen.getByTestId(`upcoming-movies-card-${movie.id}`)
        ).toBeInTheDocument();
      });
    });
  });

  test("displays error message when fetch fails", async () => {
    (movieApiClient.getMovieListUpcoming as jest.Mock).mockRejectedValueOnce(
      mockError
    );
    render(<UpcomingMovies />);
    await waitFor(() => {
      expect(
        screen.getByTestId("upcoming-movies-error-message")
      ).toBeVisible();
    });
  });

  test("displays error message when API returns an error", async () => {
    (movieApiClient.getMovieListUpcoming as jest.Mock).mockResolvedValueOnce(
      mockError
    );
    render(<UpcomingMovies />);
    await waitFor(() => {
      expect(
        screen.getByTestId("upcoming-movies-error-message")
      ).toBeVisible();
    });
  });
});
