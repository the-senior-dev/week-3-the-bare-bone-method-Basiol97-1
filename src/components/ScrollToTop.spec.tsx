import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { useLocation } from "react-router-dom";


import ScrollToTop from "./ScrollToTop"; // Adjust the import path as needed

// Mock useLocation hook
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: jest.fn(),
}));

describe("ScrollToTop Component", () => {

  // Spy on window.scrollTo
  const scrollToSpy = jest
    .spyOn(window, "scrollTo")
    .mockImplementation(() => {});

  beforeEach(() => {
    jest.clearAllMocks;
    scrollToSpy.mockClear();
    (useLocation as jest.Mock).mockClear();
  });

  test("should scroll to top on location change", () => {
    // Mock the location object
    const mockLocation = {
      pathname: "/some-path",
      search: "",
      hash: "",
      state: undefined,
      key: "default",
    };
    (useLocation as jest.Mock).mockReturnValue(mockLocation);

    render(<ScrollToTop />);

    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });

});
