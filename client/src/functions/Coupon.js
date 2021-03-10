import axios from "axios";

export const getCoupon = async () =>
	await axios.get(`${process.env.REACT_APP_API}/admin/coupon`);

export const removeCoupon = async (couponId, authtoken) =>
	await axios.delete(`${process.env.REACT_APP_API}/admin/coupon/${couponId}`, {
		headers: {
			authtoken,
		},
	});
export const createCoupon = async (coupon, authtoken) =>
	await axios.post(
		`${process.env.REACT_APP_API}/admin/coupon`,
		{ coupon },
		{
			headers: { authtoken },
		}
	);
