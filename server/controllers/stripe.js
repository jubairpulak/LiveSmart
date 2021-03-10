const Usermodel = require("../models/user");
const CartModel = require("../models/cart");
const ProductModel = require("../models/product");
const CouponModel = require("../models/coupon");
const stripe = require("stripe")(process.env.STRIPE_SECRET);

exports.createPayment = async (req, res) => {
	// console.log(req.body);
	// return;
	const { couponApplied } = req.body;
	const user = await Usermodel.findOne({ email: req.user.email }).exec();
	const { cartTotal, totalAfterDisc } = await CartModel.findOne({
		orderBy: user._id,
	}).exec();

	// console.log(
	// 	"Cart Total Charged : ",
	// 	cartTotal,
	// 	"After disc : ",
	// 	totalAfterDisc
	// );
	let amnt = 0;
	let total = 0;
	if (couponApplied && totalAfterDisc) {
		total = totalAfterDisc;
		amnt = Math.trunc((totalAfterDisc / 84.57) * 100);
		console.log("Total amount", amnt);
	} else {
		total = cartTotal;
		amnt = Math.trunc((cartTotal / 84.57) * 100);
		console.log("Total amount", amnt);
	}

	const paymentint = await stripe.paymentIntents.create({
		amount: amnt,
		currency: "usd",
	});

	// console.log("paymentint.client_sec : ", paymentint.client_Secret);
	res.send({
		clientSecret: paymentint.client_secret,
		cartTotal,
		totalAfterDisc,
		payable: total,
	});
};
