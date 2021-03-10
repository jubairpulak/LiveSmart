import React from "react";

const LocalSearch = ({ keyword, setKeyword }) => {
	//step 3
	const handleSearchChange = (e) => {
		e.preventDefault();
		setKeyword(e.target.value.toLowerCase());
	};

	return (
		<div>
			<input
				type="search"
				placeholder="Search..."
				value={keyword}
				onChange={handleSearchChange}
				className="form-control mb-4"
			/>
		</div>
	);
};

export default LocalSearch;
