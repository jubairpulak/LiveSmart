import axios from "axios";

// export const createPayment = (authtoken) =>
// 	axios.post(
// 		`${process.env.REACT_APP_API}/create-payment`,
// 		{},
// 		{
// 			headers: {
// 				authtoken,
// 			},
// 		}
// 	);

export const createPayment = async (authtoken, coupon) =>
	await axios.post(
		`${process.env.REACT_APP_API}/create-payment`,
		{ couponApplied: coupon },
		{
			headers: { authtoken },
		}
	);
