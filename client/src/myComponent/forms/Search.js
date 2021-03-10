import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { SearchOutlined } from "@ant-design/icons";

const Search = () => {
	const dispatch = useDispatch();
	const { search } = useSelector((state) => ({ ...state }));

	const { text } = search;

	const history = useHistory();

	const handleChange = (e) => {
		dispatch({
			type: "SEARCH_QUERY",
			payload: { text: e.target.value },
		});
	};

	const hanldeSubmit = (e) => {
		e.preventDefault();
		history.push(`/shop?${text}`);
	};

	return (
		<div className="input-group md-form form-sm form-2 pl-0">
			<form
				className="form-inline my-2 my-lg-0"
				onSubmit={hanldeSubmit}>
				<input
					onChange={handleChange}
					type="search"
					value={text}
					className="form-control my-0 py-1"
					placeholder="Search for product"
				/>
				<span
					className="input-group-text red lighten-3"
					id="basic-text1">
					<SearchOutlined
						onClick={hanldeSubmit}
						style={{ cursor: "pointer" }}
					/>
				</span>
			</form>
		</div>
	);
};

export default Search;
