import "@testing-library/jest-dom/extend-expect";
import { screen } from "@testing-library/react";

import { render } from "../utils/test/testUtils"; // cusom render function
import MovieList from "./MovieList";

const fullMovieMock = {
  adult: false,
  original_title: "The Original Movie",
  poster_path: "/path/to/poster.jpg",
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

const moviesList = [
  { id: 1, ...fullMovieMock },
  { id: 2, ...fullMovieMock },
  { id: 3, ...fullMovieMock },
];

describe("MovieList", () => {
  test("should render all movies when movies are fetched correctly", () => {
    render(<MovieList movieList={moviesList} error={null} loading={false} />);

    const list = screen.getAllByText(fullMovieMock.title);
    expect(list).toHaveLength(moviesList.length);
  });

  test("should show error message if error is recived", () => {
    render(
      <MovieList movieList={[]} error={{ message: "http:404", isError: true }} loading={false} />
    );

    const error = screen.getByText("http:404");
    expect(error).toBeInTheDocument();
  });

  test("should not show movies list if error exsits", () => {
    render(
      <MovieList movieList={[]} error={{ message: "http:404", isError: true }} loading={false} />
    );

    const list = screen.queryAllByText(fullMovieMock.title);
    expect(list).toHaveLength(0);
  });
});
