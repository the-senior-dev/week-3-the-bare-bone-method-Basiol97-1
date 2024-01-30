import React from "react";
import SimpleMovieCard from "./SimpleMovieCard";

type Props = {
	moviesList: Movie[] | undefined | null;
};

const MoviesLayout = ({ moviesList }: Props) => {
	return (
		<>
			{moviesList?.map((mov) => (
				<SimpleMovieCard
					data-testid={`upcoming-movies-card-${mov.id}`}
					movie={mov}
					key={mov.id} />
			))}
		</>
	);
};

export default MoviesLayout;
