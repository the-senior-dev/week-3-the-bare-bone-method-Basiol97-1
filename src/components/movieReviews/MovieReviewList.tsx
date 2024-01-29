import React, { useEffect, useState } from "react";
import styled from "styled-components";
import movieApiClient from "../../utils/movieApiClient";
import MovieReviewCard from "./MovieReviewCard";

export default function MovieReviewList({ movieId }: { movieId: string }) {
  const [reviewList, setReviewList] = useState<MovieReview[] | null>();
  const [error, setFetchError] = useState<ApiError | null>();

  useEffect(() => {
    movieApiClient.getMovieReviewList(movieId).then((data) => {
      if ("message" in data) {
        setFetchError(data);
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
      <p>{error && "An error occurred"}</p>
    </ReviewListContainer>
  );
}

const ReviewListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
