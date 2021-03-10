import React from "react";

const ShowOtherinfo = ({ order }) => {
	
	return (
		<>
			<div className="row">
				<div className="col-md-12 text-right">
					<p>Customer Name ----- {order.username}</p>
					<p>
						Customer Location -----
						{order.deliveryLocation}
						<br />
					</p>
					<p>Customer Phone No ----- {order.userphoneno}</p>
					<p>Customer Email ----- {order.useremail}</p>
					<p>
						From Last Delivery Status: ----- {showDays()} Day
					</p>
					<br />
					<hr />
				</div>
			</div>
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
			{/* //TRy to make something new */}
			<table className="table table-bordered">
				{" "}
				<thead className="thead-light">
					<tr>
						<th scope="col">Title</th>
						<th scope="col">Price</th>
						<th scope="col">Brand</th>
						<th scope="col">Color</th>
						<th scope="col">Count</th>
					</tr>
				</thead>
				<tbody>
					{order.products.map((p, i) => (
						<tr key={i}>
							<td>
								<b>{p.product.title}</b>
							</td>
							<td>
								<b>{p.product.price}</b>
							</td>
							<td>
								<b>{p.product.brand}</b>
							</td>
							<td>
								<b>{p.color}</b>
							</td>
							<td>
								<b>{p.count}</b>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
};

export default ShowOtherinfo;
