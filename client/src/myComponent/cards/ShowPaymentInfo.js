import React from "react";

import { OrderedListOutlined } from "@ant-design/icons";
import moment from "moment";

const ShowPaymentInfo = ({ ord, showStatus = true }) => {
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
				<br />
				<span>
					{" "}
					Order On :{" "}
					{moment
						.unix(ord.paymentIntent.created)
						.format("dddd, MMMM Do, YYYY h:mm:ss A")}
					{" | "}
				</span>
				<br />
				{showStatus && (
					<span className="badge bg-primary text-white">
						{" "}
						STATUS : {ord.orderStatus}
					</span>
				)}
			</p>
		</div>
	);
};
export default ShowPaymentInfo;
