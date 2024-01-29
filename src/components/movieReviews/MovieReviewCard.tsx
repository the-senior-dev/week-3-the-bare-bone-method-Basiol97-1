import React, { useState } from "react";
import moment from "moment";
import styled from "styled-components";
import settings from "../../settings";

export default function MovieReviewCard({ review }: { review: MovieReview }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const expandedStateLabel = isExpanded ? "Collapse review content" : "Expand review content";

  return (
    <Card aria-label={`Review by ${review.author_details.username}`}>
      <ReviewAuthor>
        Review by <strong>{review.author_details.username}</strong>
      </ReviewAuthor>
      <ReviewContent $expanded={isExpanded} aria-expanded={isExpanded} data-testid="movie-review-card-content">
        {review.content}
      </ReviewContent>
      <ViewMoreButton onClick={toggleExpanded} aria-label={expandedStateLabel}>
        {isExpanded ? "View Less" : "View More"}
      </ViewMoreButton>
      <ReviewDate aria-label={`Review date: ${moment(review.created_at).format("MMMM Do, YYYY")}`}>
        Date: {moment(review.created_at).format("MMMM Do, YYYY")}
      </ReviewDate>
    </Card>
  );
}

const Card = styled.div`
  background: ${settings.colors.backgroundSecondary};
  border-radius: 8px;
  box-shadow: 0 2px 4px ${settings.colors.shadow};
  padding: 20px;
  margin-bottom: 20px;
  width: 100%;
`;

const ReviewAuthor = styled.p`
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
`;

interface ReviewContentProps {
  $expanded: boolean;
}

const ReviewContent = styled.p<ReviewContentProps>`
  color: ${settings.colors.foreground};
  line-height: 1.6;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: ${(props) => (props.$expanded ? 'none' : '3')};
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
`;

const ViewMoreButton = styled.button`
  background: none;
  border: none;
  color: ${settings.colors.info};
  cursor: pointer;
  padding: 5px;
  padding-left: 0px;
  margin-top: 10px;
  font-size: 0.9em;
  &:hover {
    text-decoration: underline;
  }
`;

const ReviewDate = styled.p`
  color: ${settings.colors.foreground};
  font-size: 0.6em;
  margin-top: 10px;
  margin-bottom: 0;
`;
