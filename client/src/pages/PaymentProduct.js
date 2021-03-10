import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckout from "../myComponent/StripeCheckout";
import "../stripe.css";

const lstripe = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const PaymentProduct = () => {
	return (
		<div className="container p-5 text-center">
			<h3>Complete Your Purchase</h3>
			<Elements stripe={lstripe}>
				<div className="col-md-8 offset-md-2">
					<StripeCheckout />
				</div>{" "}
			</Elements>
		</div>
	);
};

export default PaymentProduct;
