import React from "react";
import Aos from "aos";
import { Pagination } from "antd";

import Moment from "react-moment";

import moment from "moment";

const ShowReview = ({ reviews, count }) => {
	return (
		<>
			{reviews.map((rev) => (
				<div key={rev.id} className="row">
					<div className="col-md-12">
						<div className="second py-2 px-5">
							{" "}
							<p className="d-flex">
								<span className="text1">
									By {rev.username}{" "}
									{/* <Moment parse="YYYY-MM-DD HH:mm">
									{rev.review_time}
								</Moment> */}
								</span>
								<p className="pl-3 text-secondary">
									{moment(rev.createdAt).format(
										"MMMM Do YYYY"
									)}
								</p>
								{/* {moment.{rev.review_time}.format()} */}
							</p>
							<span className="text2">{rev.review}</span>
						</div>
						<hr />
					</div>
					{/* //ENd here */}
				</div>
			))}
		</>
	);
};

export default ShowReview;
