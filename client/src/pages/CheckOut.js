import React, { useEffect, useState } from "react";
// import { GoRss } from "react-icons/go";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Descriptions, Badge } from "antd";

import {
	getusercrt,
	emptyUserCart,
	applyCoupon,
	cashorder,
} from "../functions/user";

const CheckOut = ({ history }) => {
	const [prods, setProds] = useState([]);
	const [total, setTotal] = useState(0);
	const [location, setlocation] = useState("");
	const [deliverycharge, setDeliverycharge] = useState(0);
	const [coupon, setCoupon] = useState("");
	const [totalmoneyafterdiscount, setTotalmoneyaftersetDiscount] = useState(
		0
	);
	const [discerr, setDiscerr] = useState("");
	const dispatch = useDispatch();
	const { user, COD } = useSelector((state) => ({ ...state }));
	const couponcheck = useSelector((state) => state.coupon);

	useEffect(() => {
		getusercrt(user.token).then((res) => {
			// console.log("User cart res", JSON.stringify(res.data, null, 4));
			setProds(res.data.products);
			setTotal(res.data.cartTotal);
			setlocation(res.data.deliveryLocation);
			setDeliverycharge(res.data.deliveryCharge);
			// setSingleUser(res.data.users);
			// console.log(r/es.data.users);
		});
	}, []);

	const emptyCartInfo = () => {
		if (typeof window !== "undefined") {
			localStorage.removeItem("cart");
		}

		dispatch({
			type: "ADD_TO_CART",
			payload: [],
		});

		emptyUserCart(user.token).then((res) => {
			setTotalmoneyaftersetDiscount(0);
			setCoupon("");
			setProds([]);
			setTotal(0);
			setlocation("");
			setDeliverycharge(0);
			// toast.error("Your Cart Is Empty Now...");
		});
	};

	const ShowProductsDetails = () => {
		return prods.map((p, ind) => (
			<div key={ind}>
				<p>
					{p.product.title} ({p.color}) x {p.count} = TK.
					{p.product.price * p.count}
				</p>
				<hr />
			</div>
		));
	};
	const applyDiscCOupon = () => {
		console.log("SEnd Coupon to backend", coupon);
		applyCoupon(user.token, coupon).then((res) => {
			toast.success("Coupon Successfully Applied");
			console.log("Res on Coupon Applied", res.data);
			if (res.data) {
				setTotalmoneyaftersetDiscount(res.data);
				dispatch({
					type: "COUPON_APPLIED",
					payload: true,
				});
			}
			if (res.data.err) {
				setDiscerr(res.data.err);
				dispatch({
					type: "COUPON_APPLIED",
					payload: false,
				});
			}
		});
	};

	const showCoupon = () => (
		<>
			<input
				type="text"
				onChange={(e) => {
					setCoupon(e.target.value);
					setDiscerr("");
				}}
				className="form-control"
				value={coupon}
			/>

			<button
				onClick={applyDiscCOupon}
				className="btn btn-primary mt-2">
				Apply Coupon
			</button>
		</>
	);
	// const saveAddressToDB = () => {};
	const createCashOrder = () => {
		cashorder(user.token, COD, couponcheck).then((res) => {
			// console.log("User cash order : ", res);
			if (res.data.ok) {
				// console.log("hello ");
				if (typeof window !== "undefined") {
					localStorage.removeItem("cart");
				}
				dispatch({
					type: "ADD_TO_CART",
					payload: [],
				});
				dispatch({
					type: "COUPON_APPLIED",
					payload: false,
				});
				dispatch({
					type: "COD",
					payload: false,
				});
				emptyCartInfo(user.token);
				setTimeout(() => {
					toast.success("Thank You Sir, For Purchasing");

					history.push("/user/history");
				}, 1000);
			}
		});
	};
	return (
		<div className="row">
			<div className="col-md-6 mt-5 p-5">
				<br />
				{/* <textarea />
				<button
					className="btn btn-primary mt-2"
					onClick={saveAddressToDB}></button> */}
				<h4 />
				<h4>Got Cupon?</h4>
				{showCoupon()}
				<br />
				{discerr && <p className="bg-danger p-2">{discerr}</p>}
			</div>
			<div className="col-md-6 mt-5 p-5 ">
				<p className="card p-3">
					<h4 className="text-center">Order Summary</h4>

					{/* <p>
						Total Products in the Card : <b>{prods.length}</b>
					</p> */}

					{/* <hr />
					{ShowProductsDetails()}
					<p>
						{" "}
						Delivery Charge: {location} - Tk. {deliverycharge}
					</p>
					{/* {JSON.stringify(prods)} */}
					{/* <hr /> */}
					{/* <p>Total : {total}</p> */}
					{/* {totalmoneyafterdiscount > 0 && (
						<p className="bg-success p-2">
							After Disctount : Total Payable Tk.
							{totalmoneyafterdiscount}
						</p>
					)} */}
					<hr />
					<Descriptions layout="vertical" bordered>
						<Descriptions.Item label="Total Number of products">
							{prods.length}
						</Descriptions.Item>

						<Descriptions.Item
							label=""
							span={2}></Descriptions.Item>
						<Descriptions.Item
							label="Product Description"
							span={3}>
							{ShowProductsDetails()}
						</Descriptions.Item>
						<Descriptions.Item label=""></Descriptions.Item>
						<Descriptions.Item label="Delivery Location">
							{location}
						</Descriptions.Item>
						<Descriptions.Item label="Delivery Charge">
							৳{deliverycharge}
						</Descriptions.Item>

						<Descriptions.Item label="Total Cost">
							৳{total}
						</Descriptions.Item>

						<Descriptions.Item label="Coupon Applied?">
							{totalmoneyafterdiscount > 0 ? "Yes" : "No"}
						</Descriptions.Item>

						<Descriptions.Item label="Total Cost After Discount">
							{totalmoneyafterdiscount > 0
								? `৳${totalmoneyafterdiscount}`
								: "No Coupon"}
						</Descriptions.Item>
					</Descriptions>
					<hr />

					<div className="row">
						<div className="col-md-6">
							{COD ? (
								<button
									disabled={!prods.length}
									className="btn btn-lg btn-primary"
									onClick={createCashOrder}>
									PLACE ORDER
								</button>
							) : (
								<button
									disabled={!prods.length}
									className="btn btn-lg btn-primary"
									onClick={() => {
										setTimeout(() => {
											history.push("/payment");
										}, 1000);
									}}>
									PLACE ORDER
								</button>
							)}
						</div>
						<div className="col-md-6 ">
							<button
								disabled={!prods.length}
								onClick={emptyCartInfo}
								className="btn btn-lg btn-primary">
								Empty Card
							</button>
						</div>
					</div>
				</p>
			</div>
		</div>
	);
};

export default CheckOut;
