import React from "react";

import moment from "moment";

const ShowSingleOrderDate = ({ ord }) => {
	return (
		<div>
			<p>
				<span>
					{" "}
					Order Id: {ord.paymentIntent.id}
					{" | "}
				</span>
				<span>
					{" "}
					Amount : Tk.{ord.paymentIntent.amount}
					{" | "}
				</span>
				<span>
					{" "}
					Method : {ord.paymentIntent.payment_method_types[0]}
					{" | "}
				</span>
				<span>
					{" "}
					Payment : {ord.paymentIntent.status.toUpperCase()}
					{" | "}
				</span>
				<span>
					{" "}
					Order On :{" "}
					{moment
						.unix(ord.paymentIntent.created)
						.format("dddd, MMMM Do, YYYY h:mm:ss A")}
					{" | "}
				</span>
			</p>
		</div>
	);
};
export default ShowSingleOrderDate;
