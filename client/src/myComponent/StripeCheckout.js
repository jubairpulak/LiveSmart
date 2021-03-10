import React, { useState, useEffect } from "react";

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Card } from "antd";
import { createPayment } from "../functions/Stripe";
import { createOrder, emptyUserCart } from "../functions/user";
import { CheckOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

const StripeCheckout = ({ history }) => {
	const dispatch = useDispatch();
	const { user, coupon } = useSelector((state) => ({ ...state }));

	const [succeeded, setSucceed] = useState(false);
	const [error, setError] = useState(null);
	const [process, setProcess] = useState("");
	const [disabled, setDisabled] = useState(false);
	const [clientSecret, setClientSecret] = useState("");
	const [carttotoal, setCartTotal] = useState(0);
	const [totalAfterdisc, setTotalafterdis] = useState(0);
	const [totalpayable, setTotalPaybale] = useState(0);

	const strp = useStripe();
	const elemnt = useElements();
	useEffect(() => {
		createPayment(user.token, coupon).then((res) => {
			console.log("Res data  ", res.data.clientSecret);
			setClientSecret(res.data.clientSecret);
			setCartTotal(res.data.cartTotal);
			setTotalafterdis(res.data.totalAfterDisc);
			setTotalPaybale(res.data.payable);
		});
	}, []);
	const handleSubmit = async (ele) => {
		ele.preventDefault();
		setProcess(true);
		const payload = await strp.confirmCardPayment(clientSecret, {
			payment_method: {
				card: elemnt.getElement(CardElement),
				billing_details: {
					name: ele.target.name.value,
				},
			},
		});
		if (payload.error) {
			setError(`Payment Failed ${payload.error.message}`);
			setProcess(false);
		} else {
			toast.success("Thank You Sir, For Purchasing");

			createOrder(payload, user.token).then((res) => {
				if (res.data.Okay) {
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
					emptyUserCart(user.token);
				}
			});

			console.log(JSON.stringify(payload, null, 4));
			setError(null);
			setProcess(false);
			setSucceed(true);
		}
	};
	const handleChange = async (ele) => {
		setDisabled(ele.empty);
		setError(ele.error ? ele.error.message : "");
	};

	const cartStyle = {
		style: {
			base: {
				color: "#32325d",
				fontFamily: "Arial, sans-serif",
				fontSmoothing: "antialiased",
				fontSize: "16px",
				"::placeholder": {
					color: "#32325d",
				},
			},
			invalid: {
				color: "#fa755a",
				iconColor: "#fa755a",
			},
		},
	};
	return (
		<>
			{!succeeded && (
				<div>
					{coupon && totalAfterdisc !== undefined ? (
						<p className="alert alert-success">{`Total after discount : TK.${totalAfterdisc}`}</p>
					) : (
						<p className="alert alert-danger">
							No Coupon Applied
						</p>
					)}
				</div>
			)}
			<div className="text-center pb-5">
				<Card
					actions={[
						<>
							Regular Price: <br /> Total: TK.{carttotoal}
						</>,
						<>
							<CheckOutlined className="text-info " />
							<br /> Total: TK.{totalpayable}
						</>,
					]}
				/>
			</div>
			<form
				id="payment-form"
				className="stripe-form"
				onSubmit={handleSubmit}>
				<CardElement
					id="card-element"
					options={cartStyle}
					onChange={handleChange}
				/>

				<button
					className="stripe-button"
					disabled={process || disabled || succeeded}>
					<span id="button-text">
						{process ? (
							<div className="spinner" id="spinner"></div>
						) : (
							"Pay"
						)}
					</span>
				</button>
				<br />
				{error && (
					<div className="card-error" role="alert">
						{error}
					</div>
				)}

				<br />
				<p
					className={
						succeeded
							? "result-message"
							: "result-message hidden"
					}>
					Payment Successful.
					<Link to="/user/history">Check Purchase History</Link>
				</p>
			</form>
		</>
	);
};

export default StripeCheckout;
