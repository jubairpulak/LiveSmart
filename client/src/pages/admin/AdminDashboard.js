import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AdminNav from "../../myComponent/nav/AdminNav";
import { Pagination } from "antd";
import DatePicker from "react-datepicker";
import { DeleteOutlined } from "@ant-design/icons";
import moment from "moment";
import Jumbtron from "../../myComponent/cards/Jumbotron";
import {
	getOrder,
	updateStatus,
	getOrderCount,
	getOrderbySearchDate,
} from "../../functions/admin";
import { toast } from "react-toastify";
import OrderDetails from "../../myComponent/order/OrderDetails";
import "./borderdesigncss.css";
import LocalSearch from "../../myComponent/forms/LocalSearch";

const AdminDashboard = () => {
	const [order, setOrder] = useState([]);
	const [uid, setUid] = useState([]);
	const [check, setCheck] = useState(0);
	const [startdate, setStartdate] = useState("");
	const [enddate, setEnddate] = useState("");
	const [totalamount, setTotalamount] = useState(0);
	const [users, setTotalusers] = useState(0);

	const [daycount, setDaycount] = useState(0);
	const [productsold, setProductsold] = useState(0);
	const [dataget, setDataget] = useState([]);
	const [deliveryOrder, setDeliveryOrder] = useState(0);
	const [completeorder, setCompleteorder] = useState(0);
	const [page, setPage] = useState(1);
	const [keyword, setKeyword] = useState("");

	const { user } = useSelector((state) => ({ ...state }));

	useEffect(() => {
		loadAllOrders();
	}, [page]);
	useEffect(() => {
		getOrderCount().then((res) => {
			setDeliveryOrder(res.data.total);
			setCompleteorder(res.data.totalcompleteorder);
			setTotalusers(res.data.totaluser);
		});
	}, []);

	const loadAllOrders = () =>
		getOrder("createdAt", "desc", page, user.token).then((res) => {
			console.log(JSON.stringify(res.data, null, 4));
			setOrder(res.data);
		});

	const hanldeChangeStatus = (orderId, orderStatus) => {
		updateStatus(orderId, orderStatus, user.token).then((res) => {
			toast.success("Order Status Updated");
			loadAllOrders();
		});
	};
	const handleSearchSubmit = (e) => {
		e.preventDefault();
		console.log("Start date", startdate);
		console.log("End date", enddate);
		let sold = [];
		let productnumber = [];
		const epocdate = moment(startdate).format("YYYY-MM-DD");
		const endepocdate = moment(enddate).format("YYYY-MM-DD");
		console.log("epoc date", epocdate, endepocdate);

		getOrderbySearchDate(
			"-createdAt",
			"desc",
			epocdate,
			endepocdate,
			user.token
		).then((res) => {
			setDataget(res.data.getdata);
			setDaycount(res.data.countday);
			// console.log(JSON.stringify(res.data.getdata, null, 4));

			for (const dataobj of res.data.getdata) {
				sold.push(dataobj.paymentIntent.amount);
			}

			const sumoftotalsold = sold.reduce((a, b) => {
				return a + b;
			}, 0);

			setTotalamount(sumoftotalsold);
		});
	};

	return (
		<div style={{ backgroundColor: "#E9ECEF" }}>
			<div className="jumbotron h1 font-wight-bold  text-center  mb-0 text-primary ">
				<Jumbtron
					text={[
						`Total Account : ${users}`,
						`Total Order : ${deliveryOrder}`,
						`Completed Delivery : ${completeorder}`,
					]}
				/>
			</div>
			<div className="container-fluid">
				<div className="row">
					<div
						className="col-md-2 "
						style={{ backgroundColor: "#F5F5F5" }}>
						<AdminNav />
					</div>

					<div
						className="card col-md-10  p-2 "
						style={{ backgroundColor: "#F5F5F5" }}>
						<p className=" ml-4  p-3">
							<form onSubmit={handleSearchSubmit}>
								<label className="h1 designselectdate">
									Select Date To Search Order list
								</label>
								<br />

								<DatePicker
									className="form-control "
									placeholderText="Start Date"
									selected={startdate}
									value={startdate}
									onChange={(date) => {
										setStartdate(date);
										{
											!enddate
												? setEnddate(date)
												: setEnddate(
														enddate
												  );
										}
									}}
									required
								/>

								<DatePicker
									className="form-control ml-5"
									placeholderText="End Date"
									selected={enddate}
									value={enddate}
									onChange={(date) =>
										setEnddate(date)
									}
									required
								/>
								<br />
								<button className=" mt-1  btn btn-outline-primary">
									Search
								</button>
							</form>
							<p>
								{daycount ? (
									<>
										{" "}
										<h2 className=" text-center designselectdate text-capitalize">
											You Have asked For{" "}
											{daycount}
											{daycount > 1
												? " days Data"
												: " day Data"}{" "}
										</h2>
										<h3
											text-center
											designselectdate>
											Total Order :{" "}
											{dataget.length}
										</h3>
										<OrderDetails
											order={dataget}
											hanldeChangeStatus={
												hanldeChangeStatus
											}
										/>
										<br />
										<br />
									</>
								) : (
									<>
										<hr />
										<h4 className="text-center">
											ALL Orders
										</h4>

										<OrderDetails
											order={order}
											hanldeChangeStatus={
												hanldeChangeStatus
											}
										/>
										<br />
										<br />

										<nav className="col-md-4 offset-md-4 text-center pt-5 p-3">
											<Pagination
												current={page}
												total={
													(deliveryOrder /
														5) *
													10
												}
												onChange={(value) =>
													setPage(value)
												}
											/>
										</nav>
									</>
								)}
							</p>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminDashboard;
