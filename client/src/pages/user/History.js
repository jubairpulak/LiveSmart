import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Pagination } from "antd";

import {
	CheckCircleOutlined,
	CloseCircleOutlined,
	OrderedListOutlined,
} from "@ant-design/icons";
import "./history.css";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { toast } from "react-toastify";
import ShowPaymentInfo from "../../myComponent/cards/ShowPaymentInfo";
import Jumbtron from "../../myComponent/cards/Jumbotron";
import Invoice from "../../myComponent/order/Invoice";

import UserNav from "../../myComponent/nav/UserNav";
import { getUsersOrder } from "../../functions/user";
const History = () => {
	const [order, setOrder] = useState([]);
	const [deliveryOrder, setDeliveryOrder] = useState(0);
	const [page, setPage] = useState(1);
	const { user } = useSelector((state) => ({ ...state }));

	useEffect(() => {
		loadUserOrderDetails();
	}, []);

	const loadUserOrderDetails = () =>
		getUsersOrder(user.token).then((res) => {
			console.log(JSON.stringify(res.data, null, 4));
			setOrder(res.data);
		});

	const showOrderInTbl = (ord) => (
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
				{ord.products.map((p, i) => (
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
	);

	const showDownloadLink = (ord) => (
		<PDFDownloadLink
			document={<Invoice ord={ord} />}
			fileName="OrderInvoice.pdf"
			className="btn btn-sm btn-block btn-outline-primary">
			Download Order Details
		</PDFDownloadLink>
	);
	const showEachOrders = () =>
		order.reverse().map((ord, i) => (
			<div
				key={i}
				className=" p-5  mb-3 ml-4 card "
				style={{ backgroundColor: "#FFFAF0" }}>
				<ShowPaymentInfo ord={ord} />
				<br />
				<h5 className="text-right">
					Delivery Location : {ord.deliveryLocation}
				</h5>
				{showOrderInTbl(ord)}
				<div className="col">{showDownloadLink(ord)}</div>
			</div>
		));
	return (
		<>
			<div className="container-fluid">
				<div className="row dasboardbody">
					<div className="col-md-2 pt-5 mt-5">
						<UserNav />
					</div>
					<div
						className=" col-md-8 text-center"
					>
						{order.length > 0 ? (
							<h3 className="mt-5 pt-5">
								User Purchage Orders
							</h3>
						) : (
							<h3 className="mt-5 pt-5">
								No Purchase History
							</h3>
						)}
						<hr />
						{showEachOrders()}
					</div>
				</div>
			</div>
		</>
	);
};

export default History;
