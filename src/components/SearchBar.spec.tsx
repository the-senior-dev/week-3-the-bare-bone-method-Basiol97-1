import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import SearchBar from "./SearchBar";

describe("SearchBar", () => {
  test("displays welcome message and subtitle", () => {
    // Arrange
    render(<SearchBar />);

    // Act
    const welcomeMessage = screen.getByText("Welcome.");
    const subtitle = screen.getByText(
      "Millions of movies, TV shows and people to discover. Explore now."
    );

    // Assert
    expect(welcomeMessage).toBeInTheDocument();
    expect(subtitle).toBeInTheDocument();
  });
});
