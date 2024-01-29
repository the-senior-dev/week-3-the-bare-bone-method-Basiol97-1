import React, { useEffect, useState } from "react";
import styled from "styled-components";
import movieApiClient from "../../utils/apiClient";
import MovieReviewCard from "./MovieReviewCard";
import { ErrorMessage } from "../styled";
import LoadingIndicator from "../styled/LoadingIndicator";
import settings from "../../settings";

export default function MovieReviewList({ movieId }: { movieId: string }) {
  const [reviewList, setReviewList] = useState<MovieReview[] | null>(null);
  const [error, setFetchError] = useState<ApiError | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);
      try {
        const data = await movieApiClient.getMovieReviewList(movieId);
        if ("message" in data) {
          setFetchError(data);
        } else {
          setReviewList(data.results);
        }
      } catch (error) {
        setFetchError({ message: "An error occurred", isError: true });
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [movieId]);

  return (
    <ReviewListContainer aria-label="Movie reviews list">
      {isLoading ? (
        <LoadingIndicator data-testid="movie-review-list-loader" />
      ) : (
        <>
          <ReviewsHeading data-testid="movie-review-list">
            User Reviews
          </ReviewsHeading>
          {!error &&
            reviewList?.map((review) => (
              <MovieReviewCard review={review} key={review.id} />
            ))}
          {error && (
            <ErrorMessage
              aria-live="polite"
              data-testid="movie-review-list-error"
            >
              An error occurred
            </ErrorMessage>
          )}
        </>
      )}
    </ReviewListContainer>
  );
}

const ReviewListContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
`;

const ReviewsHeading = styled.h3`
  color: ${settings.colors.foreground};
  font-size: 24px;
  margin-bottom: 20px;
  text-align: left;
  width: 100%;
  font-size: 1.6em;
`;
