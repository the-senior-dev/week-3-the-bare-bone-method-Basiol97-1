import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from './SearchBar'; // Adjust the import path as necessary
import '@testing-library/jest-dom'

describe('SearchBar Component', () => {

  test('renders with correct initial value', () => {
    const mockOnChange = jest.fn();
    const mockOnSearch = jest.fn();
    const setSuggestions = jest.fn();
    const setSearchText = jest.fn();
    const searchText = "Initial search text";

    render(
      <SearchBar 
        onSearchCallback={mockOnSearch} 
        searchText={searchText} 
        onChange={mockOnChange} 
        suggestions={[]}
        setSuggestions={setSuggestions}
        setSearchText={setSearchText}
      />
    );

    const inputElement = screen.getByDisplayValue(searchText);
    expect(inputElement).toBeInTheDocument();
  });

  test('calls onChange when input text is changed', () => {
    const mockOnChange = jest.fn();
    const mockOnSearch = jest.fn();
    const setSuggestions = jest.fn();
    const setSearchText = jest.fn();

    const searchText = "";

    render(
      <SearchBar 
        onSearchCallback={mockOnSearch} 
        searchText={searchText} 
        onChange={mockOnChange} 
        suggestions={[]}
        setSuggestions={setSuggestions}
        setSearchText={setSearchText}
      />
    );

    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: 'New text' } });
    expect(mockOnChange).toHaveBeenCalled();
  });

  test('calls onSearchCallback when Enter is pressed', () => {
    const mockOnChange = jest.fn();
    const mockOnSearch = jest.fn();
    const setSuggestions = jest.fn();
    const setSearchText = jest.fn();
    const searchText = "";

    render(
      <SearchBar 
        onSearchCallback={mockOnSearch} 
        searchText={searchText} 
        onChange={mockOnChange} 
        setSuggestions={setSuggestions}
        suggestions={[]}
        setSearchText={setSearchText}
      />
    );

    const inputElement = screen.getByRole('textbox');
    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });
    expect(mockOnSearch).toHaveBeenCalled();
  });

});
