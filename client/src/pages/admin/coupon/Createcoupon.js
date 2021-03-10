import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import { DeleteOutlined } from "@ant-design/icons";
import moment from "moment";

import {
	getCoupon,
	removeCoupon,
	createCoupon,
} from "../../../functions/Coupon";
import Jumbtron from "../../../myComponent/cards/Jumbotron";
import AdminNav from "../../../myComponent/nav/AdminNav";

import "react-datepicker/dist/react-datepicker.css";

const Createcoupon = () => {
	const [nam, setNam] = useState("");
	const [expir, setExpir] = useState("");
	const [discount, setDiscount] = useState("");
	const [loading, setLoading] = useState("");
	const [coupon, setCoupon] = useState([]);
	const { user } = useSelector((state) => ({ ...state }));

	useEffect(() => {
		loadCoupons();
	}, []);
	const loadCoupons = () => getCoupon().then((res) => setCoupon(res.data));

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		// console.table(nam, expir, discount);
		createCoupon({ nam, expir, discount }, user.token)
			.then((res) => {
				// setCoupon("");
				setLoading(false);
				loadCoupons();
				setNam("");
				setDiscount("");
				setExpir("");
				console.log(res.data);
				toast.success(`The Cupon ${res.data.nam} is Created`);
			})
			.catch((err) => {
				console.log("Create coupon err", err);
			});
	};

	const handleRemove = (couponId) => {
		if (window.confirm("Are You Want TO delte?")) {
			setLoading(true);
			removeCoupon(couponId, user.token)
				.then((res) => {
					loadCoupons();
					setLoading(false);
					toast.error("Your Selected Token is Delted");
				})
				.catch((err) => console.log(err));
		}
	};
	return (
		<>
			<div className="jumbotron h1 font-wight-bold  text-center  mb-0 text-primary ">
				<Jumbtron
					text={[
						"Coupon Information",
						`Number of Coupon : ${coupon.length}`,
					]}
				/>
			</div>
			<div className="container-fluid">
				<div className="row">
					<div className="col-md-2">
						<AdminNav />
					</div>

					<div className="col-md-10">
						<h4>Coupon</h4>
						<form onSubmit={handleSubmit}>
							<div className="form-group">
								<label className="text-muted">
									Name
								</label>
								<input
									type="text"
									className="form-control"
									onChange={(e) =>
										setNam(e.target.value)
									}
									value={nam}
									autoFocus
									required
								/>
							</div>
							<div className="form-group">
								<label className="text-muted">
									Discount %
								</label>
								<input
									type="text"
									className="form-control"
									onChange={(e) =>
										setDiscount(e.target.value)
									}
									value={discount}
									required
								/>
							</div>
							<div className="form-group">
								<label className="text-muted">
									Expiry Date :
								</label>
								<br />
								<DatePicker
									className="form-control"
									selected={expir}
									value={expir}
									onChange={(date) => setExpir(date)}
									required
									minDate={moment().toDate()}
								/>
							</div>
							<button
								className="btn btn-outline-primary"
								disabled={
									nam.length < 8 || nam.length > 14
								}>
								Save
							</button>
						</form>

						<br />

						<table className="table table-bordered">
							<thead className="thead-light">
								<tr>
									<th scope="col">Name</th>
									<th scope="col">Expire Date</th>
									<th scope="col">Discount</th>
									<th scope="col">Action</th>
								</tr>
							</thead>
							<tbody>
								{coupon.map((cop) => (
									<tr key={cop._id}>
										<td>{cop.nam}</td>
										<td>
											{new Date(
												cop.expir
											).toLocaleDateString()}
										</td>
										<td>{cop.discount} %</td>
										<td>
											<DeleteOutlined
												className="text-danger pointer"
												onClick={() =>
													handleRemove(
														cop._id
													)
												}
											/>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</>
	);
};

export default Createcoupon;
