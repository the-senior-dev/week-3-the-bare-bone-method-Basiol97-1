import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Footer from "./Footer";

describe("Given the Footer component", () => {
  beforeEach(() => {
    // When the component is rendered
    render(<Footer />);
  });

  test("Then it should render the correct number of links", () => {
    // Act
    const links = screen.getAllByRole("link");

    // Assert
    expect(links).toHaveLength(5);
  });

  describe("And it contains links", () => {
    test("Then it should render with correct link texts", () => {
      // Act & Assert
      expect(screen.getByText("Youtube")).toBeInTheDocument();
      expect(screen.getByText("LinkedIn")).toBeInTheDocument();
      expect(screen.getByText("Website")).toBeInTheDocument();
      expect(screen.getByText("Dev.to")).toBeInTheDocument();
      expect(screen.getByText("Medium")).toBeInTheDocument();
    });
  });

  test("Then it should render the logo", () => {
    // Act
    const logo = screen.getByRole("img");

    // Assert
    expect(logo).toBeInTheDocument();
  });

  test("Then it should render with the current year", () => {
    // Arrange
    const currentYear = new Date().getFullYear().toString();
    const regex = new RegExp(currentYear);

    // Act
    const footerText = screen.getByText(regex);

    // Assert
    expect(footerText).toBeInTheDocument();
  });
});
