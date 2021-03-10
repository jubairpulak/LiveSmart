import React, { useState } from "react";
import AdminNav from "../../../myComponent/nav/AdminNav";
import { toast } from "react-toastify";

import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

//access redix store
import { useSelector } from "react-redux";
import Jumbtron from "../../../myComponent/cards/Jumbotron";
import { getsingleOrder, updateStatus } from "../../../functions/admin";
import ShowSingleOrderinfo from "../../../myComponent/order/ShowSingleOrderinfo";
import Singlepayment from "../../../myComponent/order/singlepayment";

const SingleOrderCheck = (req, res) => {
	const [orderId, setOrderId] = useState("");
	const [loading, setLoading] = useState(false);
	const [paymentIntentdata, setPaymentIntentData] = useState([""]);
	const [order, setOrder] = useState([]);
	const [paymentType, setPaymenttype] = useState("");
	const [productinfo, setProductinfo] = useState([]);

	const { user } = useSelector((state) => ({ ...state }));

	const loadsingleProduct = () => {
		setLoading(true);
		console.log("Order Id : ", orderId);
		getsingleOrder(orderId, user.token)
			.then((res) => {
				setOrder(res.data.singledetails);
				setPaymentIntentData(res.data.singledetails.paymentIntent);
				setPaymenttype(
					res.data.singledetails.paymentIntent
						.payment_method_types[0]
				);
				setProductinfo(res.data.singledetails.products);
				setLoading(false);
			})
			.catch((err) => {
				setLoading(false);
				console.log(err);
			});
		console.log("order : ", order);
	};

	const hanldeChangeStatus = (orderId, orderStatus) => {
		updateStatus(orderId, orderStatus, user.token).then((res) => {
			toast.success("Order Status Updated");
			// loadsingleProduct();
		});
	};
	return (
		<>
			<div className="jumbotron h1 font-wight-bold  text-center  mb-0 text-primary ">
				<Jumbtron
					text={["Check Order", "Enter Correct Invoice ID"]}
				/>
			</div>
			<div className="container-fluid">
				<div className="row">
					<div className="col-md-2">
						<AdminNav />
					</div>
					<div className="col-md-10 p-0 ">
						<h4>Enter Payment Id : </h4>
						<div className="col-md-6">
							<input
								type="text"
								className="form-control"
								value={orderId}
								onChange={(e) =>
									setOrderId(e.target.value)
								}
								placeholder="Order Id"
								autoFocus
							/>
						</div>
						<div className="col-md-4 p-2">
							{" "}
							<button
								onClick={loadsingleProduct}
								className="btn btn-sm btn-primary mt-2"
								disabled={orderId.length < 10}>
								Get Order Information
							</button>
						</div>

						{order ? (
							<>
								<div
									key={order._id}
									className="row pb-5 m-5 p-5 card">
									<div className="btn btn-block bg-light">
										<Singlepayment
											paymentIntentdata={
												paymentIntentdata
											}
											paymentType={paymentType}
										/>
										<ShowSingleOrderinfo
											order={order}
											hanldeChangeStatus={
												hanldeChangeStatus
											}
										/>
									</div>
									{/* {JSON.stringify(productinfo)} */}
									<table className="table table-bordered">
										{" "}
										<thead className="thead-light">
											<tr>
												<th scope="col">
													Title
												</th>
												<th scope="col">
													Price
												</th>
												<th scope="col">
													Brand
												</th>
												<th scope="col">
													Color
												</th>
												<th scope="col">
													Count
												</th>
											</tr>
										</thead>
										<tbody>
											{productinfo.map(
												(p, i) => (
													<tr key={i}>
														<td>
															<b>
																{
																	p
																		.product
																		.title
																}
															</b>
														</td>
														<td>
															<b>
																{
																	p
																		.product
																		.price
																}
															</b>
														</td>
														<td>
															<b>
																{
																	p
																		.product
																		.brand
																}
															</b>
														</td>
														<td>
															<b>
																{
																	p.color
																}
															</b>
														</td>
														<td>
															<b>
																{
																	p.count
																}
															</b>
														</td>
													</tr>
												)
											)}
										</tbody>
									</table>
								</div>
							</>
						) : (
							<h3>No Order Found</h3>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default SingleOrderCheck;
