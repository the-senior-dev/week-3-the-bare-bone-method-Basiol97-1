import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import MovieCredits from "./MovieCredits";
import movieApiClient from "../utils/apiClient";

jest.mock("../utils/apiClient");

describe("MovieCredits Component", () => {
  const mockCredits = {
    cast: [
      {
        id: 1,
        name: "Actor 1",
        character: "Character 1",
        profile_path: "/path1.jpg",
      },
      {
        id: 2,
        name: "Actor 2",
        character: "Character 2",
        profile_path: "/path2.jpg",
      },
    ],
  };

  it("should initially show the loading state", async () => {
    (movieApiClient.getMovieCredits as jest.Mock).mockResolvedValue(
      mockCredits
    );
    await waitFor(() => {
      render(<MovieCredits movieId="123" />);
      expect(screen.getByTestId("movie-credits-loading")).toBeInTheDocument();
    });
  });

  it("should display cast members when data is successfully fetched", async () => {
    (movieApiClient.getMovieCredits as jest.Mock).mockResolvedValue(
      mockCredits
    );
    render(<MovieCredits movieId="123" />);
    await waitFor(() => {
      expect(screen.getByText("Actor 1")).toBeInTheDocument();
      expect(screen.getByText("Actor 2")).toBeInTheDocument();
    });
  });

  it("should display an error message when there is an API error", async () => {
    (movieApiClient.getMovieCredits as jest.Mock).mockRejectedValue(
      new Error("API Error")
    );
    render(<MovieCredits movieId="123" />);
    await waitFor(() => {
      expect(
        screen.getByTestId("movie-credits-error-message")
      ).toBeInTheDocument();
    });
  });

  it("should handle an empty cast list", async () => {
    (movieApiClient.getMovieCredits as jest.Mock).mockResolvedValue({
      cast: [],
    });
    render(<MovieCredits movieId="123" />);
    await waitFor(() => {
      expect(screen.queryAllByTestId("cast-member-item").length).toBe(0);
    });
  });

  // Optional: Test for the component re-fetching data when the movieId prop changes
  it("should refetch data when the movieId prop changes", async () => {
    const mockCredits2 = {
      cast: [
        {
          id: 3,
          name: "Actor 3",
          character: "Character 3",
          profile_path: "/path3.jpg",
        },
      ],
    };
    const mockFetch = movieApiClient.getMovieCredits as jest.Mock;
    mockFetch
      .mockResolvedValueOnce(mockCredits)
      .mockResolvedValueOnce(mockCredits2);

    const { rerender } = render(<MovieCredits movieId="123" />);
    await waitFor(() => {
      expect(screen.getByText("Actor 1")).toBeInTheDocument();
    });

    rerender(<MovieCredits movieId="456" />);
    await waitFor(() => {
      expect(screen.getByText("Actor 3")).toBeInTheDocument();
    });
  });
});
