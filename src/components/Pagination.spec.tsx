import React from "react";
import { getByTestId, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";

import Pagination, { PaginationProps } from "./Pagination";

describe("<Pagination />", () => {
  let setCurrentPageMock: jest.Mock;
  let defaultProps: PaginationProps;

  beforeEach(() => {
    setCurrentPageMock = jest.fn();
    defaultProps = {
      currentPage: 1,
      setCurrentPage: setCurrentPageMock,
      lastPage: 5,
    };
  });

  it("renders current page", () => {
    const { getByText } = render(<Pagination {...defaultProps} />);
    expect(getByText("1")).toBeInTheDocument();
  });

  it('changes page on "next" click', async () => {
    // Arrange
    const user = userEvent.setup();
    const setCurrentPageMock = jest.fn();

    const paginationProps = {
      currentPage: 1,
      setCurrentPage: setCurrentPageMock,
      lastPage: 5,
    };

    const { getByTestId } = render(<Pagination {...paginationProps} />);

    // Act
    await user.click(getByTestId("btn-next"));

    // Assert
    expect(setCurrentPageMock).toHaveBeenCalledTimes(1);
    expect(setCurrentPageMock).toHaveBeenCalledWith(2);
  });

  it('does not change page on "next" click when on last page', async () => {
    // Arrange
    const user = userEvent.setup();
    const setCurrentPageMock = jest.fn();

    const paginationProps = {
      currentPage: 5,
      setCurrentPage: setCurrentPageMock,
      lastPage: 5,
    };

    const { getByTestId } = render(<Pagination {...paginationProps} />);

    // Act
    await user.click(getByTestId("btn-next"));

    // Assert
    expect(setCurrentPageMock).not.toHaveBeenCalled();
  });

  it('changes page on "previous" click', async () => {
    // Arrange
    const user = userEvent.setup();
    const setCurrentPageMock = jest.fn();

    const paginationProps = {
      currentPage: 3,
      setCurrentPage: setCurrentPageMock,
      lastPage: 5,
    };

    const { getByTestId } = render(<Pagination {...paginationProps} />);

    // Act
    await user.click(getByTestId("btn-previous"));

    // Assert
    expect(setCurrentPageMock).toHaveBeenCalledWith(2);
  });

  it('does not change page on "previous" click when on first page', () => {
    // Arrange
    const user = userEvent.setup();
    const setCurrentPageMock = jest.fn();

    const paginationProps = {
      currentPage: 1,
      setCurrentPage: setCurrentPageMock,
      lastPage: 5,
    };

    const { getByTestId } = render(<Pagination {...paginationProps} />);

    // Act
    user.click(getByTestId("btn-previous"));

    // Assert
    expect(setCurrentPageMock).not.toHaveBeenCalled();
  });

  it('changes page on "first" click', async () => {
    // Arrange
    const user = userEvent.setup();
    const setCurrentPageMock = jest.fn();

    const paginationProps = {
      currentPage: 3,
      setCurrentPage: setCurrentPageMock,
      lastPage: 5,
    };

    const { getByTestId } = render(<Pagination {...paginationProps} />);

    // Act
    await user.click(getByTestId("btn-first"));

    // Assert
    expect(setCurrentPageMock).toHaveBeenCalledWith(1);
  });

  it('changes page on "last" click', async () => {
    // Arrange
    const user = userEvent.setup();
    const setCurrentPageMock = jest.fn();

    const paginationProps = {
      currentPage: 3,
      setCurrentPage: setCurrentPageMock,
      lastPage: 5,
    };

    const { getByTestId } = render(<Pagination {...paginationProps} />);

    // Act
    await user.click(getByTestId("btn-last"));

    // Assert
    expect(setCurrentPageMock).toHaveBeenCalledWith(5);
  });
});
