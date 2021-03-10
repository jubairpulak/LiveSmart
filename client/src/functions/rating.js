import React from "react";
import StarRatings from "react-star-ratings";

export const showAverage = (p) => {
	if (p && p.ratings) {
		let ratingsArray = p && p.ratings;
		let total = [];
		let arraylength = ratingsArray.length;

		ratingsArray.map((r) => total.push(r.star));
		let totalreducd = total.reduce((p, n) => p + n, 0);
		let highest = arraylength * 5;
		let result = (totalreducd * 5) / highest;
		console.log("Result", result);

		return (
			<div className="text-left pt-1 pb-3">
				<span>
					<StarRatings
						starRatedColor="blue"
						starDimension="18px"
						starSpacing="2px"
						rating={result}
						editing={false}
					/>
					(
					<span className="text-primary">
						{p.ratings.length}
					</span>
					)
				</span>
			</div>
		);
	}
};
