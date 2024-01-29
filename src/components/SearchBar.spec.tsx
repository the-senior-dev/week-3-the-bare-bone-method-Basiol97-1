import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, screen } from '@testing-library/react';
import SearchBar from './SearchBar';
import { render } from '../utils/test/testUtils';

describe('SearchBar', () => {
  const mockOnChange = jest.fn();
  const mockOnButtonClick = jest.fn();
  const value = '';

  beforeEach(() => {
    mockOnButtonClick.mockClear();
    mockOnChange.mockClear();
    render(<SearchBar onChange={mockOnChange} onButtonClick={mockOnButtonClick} value={value} />);
  });

  it('Given the SearchBar component, when rendered, then it should display the search input and button', () => {
    // Assert
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    expect(screen.getByTestId('search-button')).toBeInTheDocument();
  });

  it('Given the user types in the search input, when the input value changes, then it calls the onChange handler', () => {
    // Act
    fireEvent.change(screen.getByTestId('search-input'), { target: { value: 'test' } });

    // Assert
    expect(mockOnChange).toHaveBeenCalledWith('test');
  });

  it('Given the user presses the enter key in the search input, when the key is pressed, then it calls the onButtonClick handler', () => {
    // Act
    fireEvent.keyDown(screen.getByTestId('search-input'), { key: 'Enter', code: 'Enter' });

    // Assert
    expect(mockOnButtonClick).toHaveBeenCalledTimes(1);
  });

  it('Given the user clicks the search button, when the button is clicked, then it calls the onButtonClick handler', () => {
    // Act
    fireEvent.click(screen.getByTestId('search-button'));

    // Assert
    expect(mockOnButtonClick).toHaveBeenCalledTimes(1);
  });
});
