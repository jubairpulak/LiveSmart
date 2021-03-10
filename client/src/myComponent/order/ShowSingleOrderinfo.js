import React from "react";
import moment from "moment";
import Moment from "react-moment";

const ShowSingleOrderinfo = ({ order, hanldeChangeStatus }) => {
	// console.log("order id:", order.paymentIntent.created);
	console.log("payment Intent", order.paymentIntent);
	console.log("products Intent", order.products);
	const showDays = () => {
		const format1 = "YYYY-MM-DD HH:mm:ss";

		const prevDate = moment(order.updatedAt).format(format1);

		console.log("Formatted Date:", prevDate);

		let today = new Date();
		// let dd = today.getDate();

		today = moment(today).format(format1);
		console.log(today);
		// const day1 = new Date("08/25/2020");
		// console.log(typeof day1);

		// const days = today.diff(prevDate);
		return (
			<Moment diff={prevDate} unit="days">
				{today}
			</Moment>
		);
		// console.log(days);
	};
	return (
		<>
			<div className="text-right">
				<p>Customer Name ----- {order.username}</p>
				<p>
					Customer Location -----
					{order.deliveryLocation}
					<br />
				</p>
				<p>Customer Phone No ----- {order.userphoneno}</p>
				<p>Customer Email ----- {order.useremail}</p>
				<p>From Last Delivery Status: ----- {showDays()} Day</p>
			</div>
			<br />
			<hr />

			<div className="row">
				<div className="col-md-4">
					<p>Delivery Status</p>
				</div>
				<div className="col-md-8">
					<select
						onChange={(e) =>
							hanldeChangeStatus(order._id, e.target.value)
						}
						className="form-control abc"
						defaultValue={order.orderStatus}
						name="status">
						<option value="Not Processed">
							Not Processed
						</option>
						<option value="Processing">Processing</option>
						<option value="Dispatched">Dispatched</option>
						<option value="Cancelled">Cancelled</option>
						<option value="Completed">Completed</option>
					</select>
				</div>
			</div>

			<br />
		</>
	);
};

export default ShowSingleOrderinfo;
