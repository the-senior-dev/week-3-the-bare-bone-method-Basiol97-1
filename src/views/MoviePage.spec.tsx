import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";

import movieApiClient from "../utils/movieApiClient";
import MoviePage from "./MoviePage";

const mockMovieId = "123";
const mockReviewList: MovieReview[] = [
  {
    id: "1",
    author: "John Doe",
    author_details: {
      id: "1",
      username: "JohnDoe",
      name: "John Doe",
      avatar_path: "/path/to/avatar.jpg",
      rating: 8.5,
    },
    content: "Great movie!",
    created_at: "2022-01-01",
  },
  {
    id: "2",
    author: "Jane Smith",
    author_details: {
      id: "2",
      username: "JaneSmith",
      name: "Jane Smith",
      avatar_path: "/path/to/avatar.jpg",
      rating: 9.0,
    },
    content: "Awesome performance!",
    created_at: "2022-01-02",
  },
];

jest.mock("../utils/movieApiClient", () => ({
  getMovieDetail: jest.fn(),
  buildMoviePosterUrl: jest.fn(),
  getMovieReviewList: jest.fn(),
}));

describe("MoviePage", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("displays movie details on successful API call", async () => {
    // Arrange
    const movieData = {
      title: "The Movie",
      tagline: "A great movie",
      vote_average: 8.5,
      overview: "This is the movie's plot",
      poster_path: "/path/to/poster.jpg",
    };
    (movieApiClient.getMovieDetail as jest.Mock).mockResolvedValue(movieData);
    (movieApiClient.buildMoviePosterUrl as jest.Mock).mockReturnValue(
      "http://example.com/poster.jpg"
    );
    (movieApiClient.getMovieReviewList as jest.Mock).mockResolvedValueOnce({
      results: mockReviewList,
    });

    // Act
    render(
      <MemoryRouter initialEntries={[`/movies/123`]}>
        <Routes>
          <Route path="/movies/:id" element={<MoviePage />}></Route>
        </Routes>
      </MemoryRouter>
    );

    // Assert
    await waitFor(() => {
      expect(screen.getByText("The Movie")).toBeInTheDocument();
      expect(screen.getByText("Tagline: A great movie")).toBeInTheDocument();
      expect(screen.getByText("Rating: 8.5")).toBeInTheDocument();
      expect(
        screen.getByText("Plot: This is the movie's plot")
      ).toBeInTheDocument();
    });
  });

  test("fetches movie details on component mount", async () => {
    // Arrange
    const movieData = {
      title: "The Movie",
      tagline: "A great movie",
      vote_average: 8.5,
      overview: "This is the movie's plot",
      poster_path: "/path/to/poster.jpg",
    };
    (movieApiClient.getMovieDetail as jest.Mock).mockResolvedValue(movieData);
    (movieApiClient.buildMoviePosterUrl as jest.Mock).mockReturnValue(
      "http://example.com/poster.jpg"
    );
    (movieApiClient.getMovieReviewList as jest.Mock).mockResolvedValueOnce({
      results: mockReviewList,
    });

    // Act
    render(
      <MemoryRouter initialEntries={[`/movies/123`]}>
        <Routes>
          <Route path="/movies/:id" element={<MoviePage />}></Route>
        </Routes>
      </MemoryRouter>
    );

    // Assert
    await waitFor(() => {
      expect(movieApiClient.getMovieDetail).toHaveBeenCalledTimes(1);
      expect(movieApiClient.getMovieDetail).toHaveBeenCalledWith("123");
    });
  });

  // Add more test cases as needed
});
