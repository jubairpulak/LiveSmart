import axios from "axios";

export const usercrt = async (
	cart,
	deliveryCharge,
	location,
	phonenumber,
	authtoken
) =>
	await axios.post(
		`${process.env.REACT_APP_API}/user/cart`,
		{ cart, location, deliveryCharge, phonenumber },

		{
			headers: {
				authtoken,
			},
		}
	);

export const getusercrt = async (authtoken) =>
	await axios.get(`${process.env.REACT_APP_API}/user/cart`, {
		headers: {
			authtoken,
		},
	});
export const emptyUserCart = async (authtoken) =>
	await axios.put(
		`${process.env.REACT_APP_API}/user/cart`,
		{},
		{
			headers: {
				authtoken,
			},
		}
	);
export const applyCoupon = async (authtoken, coupon) =>
	await axios.post(
		`${process.env.REACT_APP_API}/user/cart/coupon`,
		{ coupon },
		{
			headers: {
				authtoken,
			},
		}
	);
export const createOrder = async (stripeResponse, authtoken) =>
	await axios.post(
		`${process.env.REACT_APP_API}/user/order`,
		{ stripeResponse },
		{
			headers: {
				authtoken,
			},
		}
	);
export const getUsersOrder = async (authtoken) =>
	await axios.get(
		`${process.env.REACT_APP_API}/user/orders`,

		{
			headers: {
				authtoken,
			},
		}
	);
export const getUserwishlist = async (authtoken) =>
	await axios.get(
		`${process.env.REACT_APP_API}/user/wishlist`,

		{
			headers: {
				authtoken,
			},
		}
	);
export const removeWishlist = async (productId, authtoken) =>
	await axios.put(
		`${process.env.REACT_APP_API}/user/wishlist/${productId}`,
		{},

		{
			headers: {
				authtoken,
			},
		}
	);
export const createUserwishlist = async (productId, authtoken) =>
	await axios.post(
		`${process.env.REACT_APP_API}/user/wishlist`,
		{ productId },

		{
			headers: {
				authtoken,
			},
		}
	);

export const getCart = async (authtoken) =>
	await axios.get(
		`${process.env.REACT_APP_API}/user/getcart`,

		{
			headers: {
				authtoken,
			},
		}
	);
export const removeCart = async (productId, authtoken) =>
	await axios.put(
		`${process.env.REACT_APP_API}/user/deletecart/${productId}`,
		{},

		{
			headers: {
				authtoken,
			},
		}
	);
export const createCart = async (productId, authtoken) =>
	await axios.post(
		`${process.env.REACT_APP_API}/user/addtocart`,
		{ productId },

		{
			headers: {
				authtoken,
			},
		}
	);
export const cashorder = async (authtoken, COD, coupon) =>
	await axios.post(
		`${process.env.REACT_APP_API}/user/cashpayment`,
		{ couponApplied: coupon, COD },
		{
			headers: {
				authtoken,
			},
		}
	);


export const createreview = async (slug, review, authtoken) =>
	await axios.put(
		`${process.env.REACT_APP_API}/user/${slug}`,
		{ review },
		{
			headers: {
				authtoken,
			},
		}
	);


export const getReview = async (slug, sort, order, page) =>
	await axios.post(`${process.env.REACT_APP_API}/${slug}`, {
		sort,
		order,
		page,
	});

export const getReviewCount = async (slug) =>
	await axios.post(`${process.env.REACT_APP_API}/slug/rev`, { slug });

export const getOrderCount = async () =>
	await axios.get(`${process.env.REACT_APP_API}/dashboard/user/total`);

export const sendFeedbackdata = async (
	email,
	name,
	feedbackdetails,
	authtoken
) =>
	await axios.post(
		`${process.env.REACT_APP_API}/user/feedback`,
		{ email, name, feedbackdetails },
		{
			headers: {
				authtoken,
			},
		}
	);
