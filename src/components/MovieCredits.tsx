import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import movieApiClient from "../utils/apiClient";
import { ErrorMessage, LoadingComponent, PageSection, SectionTitle } from "./styled";
import settings from "../settings";
import { DarkModeContext } from "../store/context";

interface MovieCreditsProps {
  movieId: string;
}

const MovieCredits = ({ movieId }: MovieCreditsProps) => {
  const [credits, setCredits] = useState<MovieCreditsResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<ApiError | null>(null);

  const {theme} = useContext(DarkModeContext);

  useEffect(() => {
    const fetchMovieCredits = async () => {
      try {
        setLoading(true);
        const data = await movieApiClient.getMovieCredits(movieId);
        if ("message" in data) {
          setError({ message: data.message, isError: true });
        } else {
          setCredits(data);
        }
      } catch (err) {
        setError({ message: "An error occured.", isError: true });
      } finally {
        setLoading(false);
      }
    };
    fetchMovieCredits();
  }, [movieId]);

  return (
    <PageSection>
      <SectionTitle>Cast</SectionTitle>
      {!loading && !error && (
        <CastList>
          {credits &&
            credits?.cast.map((castMember, index) => (
              <CastMemberItem key={index}>
                <CastMemberImage
                  src={`https://image.tmdb.org/t/p/w500${castMember.profile_path}`}
                  alt={castMember.name}
                />
                <CastMemberName $color={theme.foreground}>{castMember.name}</CastMemberName>
                <CastMemberCharacter $color={theme.foreground}>
                  as {castMember.character}
                </CastMemberCharacter>
              </CastMemberItem>
            ))}
        </CastList>
      )}
      {loading && <LoadingComponent data-testid="movie-credits-loading" />}
      {error && (
        <ErrorMessage data-testid="movie-credits-error-message">
          {error.message}
        </ErrorMessage>
      )}
    </PageSection>
  );
};

export default MovieCredits;

const CastList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  overflow-x: scroll;
  overflow-y: hidden;
  margin-top: 0px;
`;

const CastMemberItem = styled.li`
  width: 200px;
  text-align: center;
  width: 200px;
  text-align: left;
  height: auto;
  margin-right: 20px;
  max-height: 350px;
`;

const CastMemberImage = styled.img`
  height: 240px;
  object-fit: cover;
  width: 200px;
  border-radius: 4px;
  box-shadow: 0 2px 4px ${settings.colors.shadow};
`;

interface CastMemberNameProps {
  $color: string;
}

const CastMemberName = styled.p<CastMemberNameProps>`
  font-size: 1em;
  color: ${props => props.$color};
  margin-top: 8px;
  font-weight: bold;
  margin-bottom: 0px;
`;

interface CastMemberCharacterProps {
  $color: string;
}

const CastMemberCharacter = styled.p<CastMemberCharacterProps>`
  font-size: 0.8em;
  color: ${props => props.$color};
  margin-top: 0px;
  margin-bottom: 0px;
`;
