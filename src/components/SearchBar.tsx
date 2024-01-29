import React, { useContext, useState } from "react";
import styled from "styled-components";
import chroma from "chroma-js";
import PrimaryButton from "../components/styled/PrimaryButton";
import { DarkModeContext } from "../store/context";
import backgroundImage from "../assets/search-header.png";

interface SearchBarProps {
  setSearchText: (text: string) => void;
}

export default function SearchBar({ setSearchText }: SearchBarProps) {
  const [inputText, setInputText] = useState("Star Wars");
  const context = useContext(DarkModeContext);

  return (
    <SearchBarContainer>
      <SearchBarTitle color={"#dfe6e9"}>Welcome.</SearchBarTitle>
      <SearchBarSubTitle color={"#dfe6e9"}>
        Millions of movies, TV shows and people to discover. Explore now.
      </SearchBarSubTitle>
      <SearchWrapper>
        <SearchInput
          color={context.theme.foreground}
          backgroundColor={context.theme.background}
          value={inputText}
          onChange={(event) => setInputText(event.target.value)}
        ></SearchInput>
        <PrimaryButton onClick={() => setSearchText(inputText)}>
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
  backgroundColor: string;
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
  background-color: ${(props) => props.backgroundColor};
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
