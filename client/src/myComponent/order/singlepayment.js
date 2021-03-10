import React from "react";
import moment from "moment";
const Singlepayment = ({ paymentIntentdata, paymentType }) => {
	// console.log("payment data :", paymentIntentdata.payment_method_types[0]);

	return (
		<div>
			<p>
				<span>
					{" "}
					Order Id: {paymentIntentdata.id}
					{" | "}
				</span>
				<span>
					{" "}
					Amount : Tk.{paymentIntentdata.amount}
					{" | "}
				</span>
				<span>
					{" "}
					Method : {paymentType}
					{" | "}
				</span>
				<span>
					{" "}
					Payment : {paymentIntentdata.status}
					{" | "}
				</span>
				<br />
				<span>
					{" "}
					Order On :{" "}
					{moment
						.unix(paymentIntentdata.created)
						.format("dddd, MMMM Do, YYYY h:mm:ss A")}
					{" | "}
				</span>
			</p>
		</div>
	);
};

export default Singlepayment;
