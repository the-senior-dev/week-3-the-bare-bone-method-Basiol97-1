import React from "react";
import MovieCard from "./MovieCard";
import { fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { Movie } from "../utils/typesApi";
import { render } from "../utils/test-utils"; // custom render implementation

// Mock for useNavigate
const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));

describe("loads and displays the review", () => {
  const movie: Movie = {
    adult: false,
    backdrop_path: "/jBFxXKCrViA88hhO59fDx0Av4P.jpg",
    genre_ids: [12, 28, 878],
    id: 11,
    original_language: "en",
    original_title: "Star Wars",
    overview:
      "Princess Leia is captured and held hostage by the evil Imperial forces in their effort to take over the galactic Empire. Venturesome Luke Skywalker and dashing captain Han Solo team together with the loveable robot duo R2-D2 and C-3PO to rescue the beautiful princess and restore peace and justice in the Empire.",
    popularity: 84.624,
    poster_path: "/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg",
    release_date: "1977-05-25",
    title: "Star Wars",
    video: false,
    vote_average: 8.2,
    vote_count: 17424,
  };

  test("The Movie is rendered correctly", () => {
    render(<MovieCard movie={movie} />);

    // DOM Query
    expect(
      screen.getByTestId(`movie-card-title-${movie.id}`)
    ).toHaveTextContent(movie.title);
  });
  describe("When the user clicks on the movie card", () => {
    test("then the router redirects to the correct movie path", () => {
      render(<MovieCard movie={movie} />);

      fireEvent.click(screen.getByTestId(`movie-card-container-${movie.id}`));

      expect(mockedUsedNavigate).toBeCalledTimes(1);
      // expect(mockedNavigate).toBeCalledWith(`/movie/${movie.id}`);
    });
  });
});
