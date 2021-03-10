import React from "react";

import StarRatings from "react-star-ratings";

const StarRat = ({ starClick, numberofStars }) => (
	<>
		<StarRatings
			changeRating={() => starClick(numberofStars)}
			numberOfStars={numberofStars}
			starDimension="20px"
			starSpacing="2px"
			starHoverColor="red"
			starEmptyColor="red"
		/>
		<br />
	</>
);

export default StarRat;
