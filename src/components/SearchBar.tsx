import React, {
  ChangeEventHandler,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import chroma from "chroma-js";
import PrimaryButton from "../components/styled/PrimaryButton";
import { DarkModeContext } from "../store/context";
import backgroundImage from "../assets/search-header.png";
import { set } from "lodash";

interface SearchBarProps {
  onSearchCallback: () => void;
  onChange: ChangeEventHandler<HTMLInputElement>;
  searchText: string;
  suggestions: string[];
  setSuggestions: (suggestions: string[]) => void;
  setSearchText: (searchText: string) => void;
}

export default function SearchBar({
  onSearchCallback,
  searchText,
  onChange,
  suggestions,
  setSuggestions,
  setSearchText
}: SearchBarProps) {
  const context = useContext(DarkModeContext);
  const ref = useRef<HTMLDivElement>(null);
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      onSearchCallback();
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // Type assertion to ensure the target is a Node
      const target = event.target as Node;
  
      if (ref.current && !ref.current.contains(target)) {
        setSuggestions([]);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <SearchBarContainer>
      <SearchBarTitle color={"#dfe6e9"}>Welcome.</SearchBarTitle>
      <SearchBarSubTitle color={"#dfe6e9"}>
        Millions of movies, TV shows and people to discover. Explore now.
      </SearchBarSubTitle>
      <SearchWrapper>
        <SearchInputWrapper>
          <SearchInput
            id="search-bar-input"
            data-cy="search-input"
            color={context.theme.foreground}
            $backgroundColor={context.theme.background}
            value={searchText}
            onChange={onChange}
            onKeyDown={handleKeyPress}
          ></SearchInput>
          {suggestions.length > 0 && (
            <SuggestionContainer ref={ref}>
              {suggestions.map((suggestion: string) => (
                <Suggestion
                  onClick={() => {
                    setSearchText(suggestion);
                    onSearchCallback();
                  }}
                >
                  {suggestion}
                </Suggestion>
              ))}
            </SuggestionContainer>
          )}
        </SearchInputWrapper>

        <PrimaryButton onClick={onSearchCallback} data-cy="search-button">
          Search
        </PrimaryButton>
      </SearchWrapper>
    </SearchBarContainer>
  );
}

const Suggestion = styled.button`
  width: 100%;
  text-align: left;
  border: none;
  font-weight: 300;
  padding-bottom: 7px;
  padding-top: 7px;
  padding-left: 10px;
  &:hover {
    cursor: pointer;
    background-color: #6c5ce7;
    color: white;
  }
`;

const SuggestionContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  position: absolute;
  top: 40px;
  width: calc(100% - 10px);
  border-radius: 5px;
  border: 1px solid grey;
`;

const SearchInputWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  position: relative;
  width: 100%;
`;

const SearchBarContainer = styled.div`
  height: 300px;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  background-image: url("${backgroundImage}");
  padding: 20px;
  box-sizing: border-box;
  margin-bottom: 20px;
`;

const SearchBarTitle = styled.h2`
  font-size: 3em;
  font-weight: 700;
  line-height: 1;
  color: ${(props) => props.color};
  margin-bottom: 10px;
`;

const SearchBarSubTitle = styled.h3`
  font-size: 2em;
  font-weight: 600;
  margin: 0;
  color: ${(props) => props.color};
  margin-bottom: 40px;
`;

// NOTE: You can use the components bellow to go quicker

interface SearchInputProps {
  $backgroundColor: string;
  color: string;
}

const SearchInput = styled.input<SearchInputProps>`
  display: flex;
  border-radius: 0px;
  border-width: 1px;
  height: 40px;
  flex-grow: 1;
  padding: 0px;
  margin-right: 10px;
  padding-left: 10px;
  font-size: 1rem;
  color: ${(props) => props.color};
  font-weight: 300;
  background-color: ${(props) => props.$backgroundColor};
  border-color: ${(props) => props.color};
  :focus-visible {
    outline: none;
    border-color: ${chroma("#6c5ce7").saturate().hex()};
  }
`;

const SearchWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: flex-end;
`;
