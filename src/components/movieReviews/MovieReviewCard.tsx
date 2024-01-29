import React from "react";
import moment from "moment";
import { MovieReview } from "../../utils/typesApi";

export default function MovieReviewCard({ review }: { review: MovieReview }) {
  return (
    <div>
      <p>
        Review by{" "}
        <strong data-testid="review-card-username">
          {review.author_details.username}
        </strong>
      </p>
      <p data-testid="review-card-content">{review.content}</p>
      <p data-testid="review-card-date">
        Date: {moment(review.created_at).format()}
      </p>
    </div>
  );
}
