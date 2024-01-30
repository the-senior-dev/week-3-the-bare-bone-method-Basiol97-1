import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import SearchBar from "./SearchBar";

describe("SearchBar", () => {
  test("displays welcome message and subtitle", () => {
    render(<SearchBar />);

    const welcomeMessage = screen.getByText("Welcome.");
    const subtitle = screen.getByText(
      "Millions of movies, TV shows and people to discover. Explore now."
    );

    expect(welcomeMessage).toBeInTheDocument();
    expect(subtitle).toBeInTheDocument();
  });

  test("should fire onClick", () => {
    const handleSearch = jest.fn();

    render(<SearchBar handleSearch={handleSearch} />);

    const searchButton = screen.getByText("Search");
    fireEvent.click(searchButton);
    expect(handleSearch).toHaveBeenCalled();
  });
});
