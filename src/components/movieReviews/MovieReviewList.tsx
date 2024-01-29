import React, { useEffect, useState } from "react";
import styled from "styled-components";
import movieApiClient from "../../utils/movieApiClient";
import { ApiError, isApiError, MovieReview } from "../../utils/typesApi";
import MovieReviewCard from "./MovieReviewCard";

export default function MovieReviewList({ movieId }: { movieId: string }) {
  const [reviewList, setReviewList] = useState<MovieReview[] | null>();
  const [error, setFetchError] = useState<ApiError | null>();

  useEffect(() => {
    movieApiClient.getMovieReviewList(movieId).then((data) => {
      if (isApiError(data)) {
        setFetchError(error);
      } else {
        setReviewList(data.results);
      }
    });
  }, []);

  return (
    <ReviewListContainer>
      <h3>Reviews:</h3>
      {!error &&
        reviewList?.map((review) => (
          <MovieReviewCard review={review} key={review.id} />
        ))}
      {error?.message}
    </ReviewListContainer>
  );
}

const ReviewListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
