import React, { useContext } from "react";
import styled from "styled-components";
import chroma from "chroma-js";

import { DarkModeContext } from "../store/context";
import backgroundImage from "../assets/search-header.jpeg";
import settings from "../settings";
import PrimaryButton from "./styled/PrimaryButton";

interface SearchBarProps {
  onChange: (text: string) => void;
  onButtonClick: () => void;
  value: string;
}

export default function SearchBar({
  onChange,
  onButtonClick,
  value,
}: SearchBarProps) {
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      onButtonClick();
    }
  };

  const {theme} = useContext(DarkModeContext);

  return (
    <SearchBarContainer>
      <SearchBarTitle color={settings.colors.backgroundSecondary}>Welcome.</SearchBarTitle>
      <SearchBarSubTitle color={settings.colors.backgroundSecondary}>
        Millions of movies, TV shows and people to discover. Explore now.
      </SearchBarSubTitle>
      <SearchWrapper>
        <SearchInput
          $backgroundColor={theme.background}
          $color={theme.foreground}
          data-testid="search-input"
          value={value}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            onChange(event.target.value)
          }
          onKeyDown={handleKeyPress}
        ></SearchInput>
        <PrimaryButton
          data-testid="search-button"
          onClick={() => onButtonClick()}
        >
          Search
        </PrimaryButton>
      </SearchWrapper>
    </SearchBarContainer>
  );
}

const SearchBarContainer = styled.div`
  height: 300px;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  background-image: url("${backgroundImage}");
  background-size: cover;
  background-repeat: no-repeat;
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
  font-size: 1.8em;
  font-weight: 500;
  margin: 0;
  color: ${(props) => props.color};
  margin-bottom: 40px;
`;

// NOTE: You can use the components bellow to go quicker

interface SearchInputProps {
  $backgroundColor: string;
  $color: string;
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
  color: ${(props) => props.$color};
  font-weight: 300;
  background-color: ${(props) => props.$backgroundColor};
  border-color: ${(props) => props.$color};
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
