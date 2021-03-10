// const uniquid = require("uniqueid");
const User = require("../models/user");
const Product = require("../models/product");
const Cart = require("../models/cart");
const CouponModel = require("../models/coupon");
// const cart = require("../models/cart");
const Ordermodel = require("../models/order");
// const uniqueid = require("uniqueid");
const generateUniqueId = require("generate-unique-id");

const feedbackschema = require("../models/feedback");
exports.UserControler = async (req, res) => {
	const { cart, deliveryCharge, location, phonenumber } = req.body;

	let prods = [];

	const user = await User.findOne({ email: req.user.email }).exec();

	let cartexistByUser = await Cart.findOne({ orderBy: user._id }).exec();

	console.log("cartExistByUser :", cartexistByUser);
	if (cartexistByUser) {
		cartexistByUser.remove();
		console.log("Removed old cart");
	}

	for (let i = 0; i < cart.length; i++) {
		let obj = {};
		obj.product = cart[i]._id;
		obj.count = cart[i].count;
		obj.color = cart[i].color;
		// console.log("cart : ", cart);

		let { price } = await Product.findById(cart[i]._id)
			.select("price")
			.exec();

		obj.price = price;

		prods.push(obj);
	}

	console.log("Products", prods);
	let cartTotl = 0;
	for (let i = 0; i < prods.length; i++) {
		cartTotl = cartTotl + prods[i].price * prods[i].count;
	}
	cartTotl = cartTotl + deliveryCharge;
	console.log("Total Amount Cart : ", prods);

	let newCrt = await new Cart({
		products: prods,
		username: user.name,
		useremail: user.email,
		userphoneno: phonenumber,
		deliveryCharge: deliveryCharge,
		deliveryLocation: location,
		cartTotal: cartTotl,
		orderBy: user._id,
	}).save();

	console.log("New Cart  --->: ", newCrt);
	res.json({ isokay: true });
};

exports.getUserCart = async (req, res) => {
	const user = await User.findOne({ email: req.user.email }).exec();

	console.log("user fond ? ", user);
	let cart = await Cart.findOne({ orderBy: user._id }).populate(
		"products.product",
		"_id title price deliveryCharge, deliveryLocation totalAfterDisc"
	);

	const {
		products,
		cartTotal,
		deliveryCharge,
		deliveryLocation,
		totalAfterDisc,
	} = cart;

	res.json({
		products,

		cartTotal,
		deliveryCharge,
		deliveryLocation,
		totalAfterDisc,
	});
};

exports.emptyCartInfo = async (req, res) => {
	const user = await User.findOne({ email: req.user.email }).exec();

	const cart = await Cart.findOneAndRemove({ orderBy: user._id }).exec();

	res.json(cart);
};

exports.applyCoupon = async (req, res) => {
	const { coupon } = req.body;
	console.log("Coupon", coupon);

	const validCoupon = await CouponModel.findOne({ nam: coupon }).exec();
	if (validCoupon === null) {
		return res.json({
			err: "Invalid Coupon",
		});
	}

	console.log("Valid Coupon : ", validCoupon);
	const user = await User.findOne({ email: req.user.email }).exec();
	let { products, cartTotal, username } = await Cart.findOne({
		orderBy: user._id,
	})
		.populate("products.product", "_id title price")
		.exec();

	console.log(
		"username : ",
		username,
		"CartTotal",
		cartTotal,
		"Discount : ",
		validCoupon.discount
	);
	let totalAfterDisc = (
		cartTotal -
		(cartTotal * validCoupon.discount) / 100
	).toFixed(2);

	const ab = await Cart.findOneAndUpdate(
		{ orderBy: user._id },
		{ totalAfterDisc: totalAfterDisc },
		{ new: true }
	).exec();
	console.log(ab);

	res.json(totalAfterDisc);
};

exports.createOrder = async (req, res) => {
	const { paymentIntent } = req.body.stripeResponse;
	console.log("PaymentIntent : ", paymentIntent);

	const user = await User.findOne({ email: req.user.email }).exec();

	const monthNames = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	let {
		products,
		deliveryLocation,
		username,
		useremail,
		userphoneno,
		totalAfterDisc,
	} = await Cart.findOne({ orderBy: user._id }).exec();
	console.log("products info: ", products);
	const d = new Date();
	const nameofcurrentmonth = monthNames[d.getMonth()];
	console.log(nameofcurrentmonth);
	obj = { thetop: nameofcurrentmonth };
	const updateeachmonth = async (prod) => {
		console.log("prod data: ", obj.thetop);

		const updatemonthly = await Product.findByIdAndUpdate(
			{ _id: prod.product },
			{
				$inc: {
					[obj.thetop]: +prod.count,
				},
			}
		);
	};

	const updateMonthwiseSale = products.map((prod) => {
		updateeachmonth(prod);
	});
	const invoiceid = paymentIntent.id;
	// console.log("paymetn Id ", ordid);
	let newOrder = await new Ordermodel({
		products,
		deliveryLocation,
		username,
		userphoneno,
		useremail,
		totalAfterDisc,
		paymentIntent,
		invoiceid,
		orderBy: user._id,
	}).save();
	let Opt = products.map((item) => {
		return {
			updateOne: {
				filter: { _id: item.product._id },
				update: {
					$inc: { quantity: -item.count, sold: +item.count },
				},
			},
		};
	});
	let updated = await Product.bulkWrite(Opt, {});
	// console.log("Updated : ", updated);
	// console.log("New Order Saved : ", newOrder);

	res.json({ Okay: true });
};

exports.getOrders = async (req, res) => {
	let user = await User.findOne({ email: req.user.email }).exec();

	let userorder = await Ordermodel.find({ orderBy: user._id })
		.populate("products.product")
		.exec();
	// console.log("Payment Intent : ", userorder.paymentIntent.id);
	res.json(userorder);
};

exports.addtowishlist = async (req, res) => {
	const { productId } = req.body;
	const user = await User.findOneAndUpdate(
		{ email: req.user.email },
		{ $addToSet: { wishlist: productId } }
	).exec();

	res.json({ ok: true });
};
exports.wishlist = async (req, res) => {
	const list = await User.findOne({ email: req.user.email })
		.select("wishlist")
		.populate("wishlist")
		.exec();

	res.json(list);
};
exports.removewishlist = async (req, res) => {
	const { productId } = req.params;
	const user = await User.findOneAndUpdate(
		{ email: req.user.email },
		{ $pull: { wishlist: productId } }
	).exec();

	res.json({ ok: true });
};

exports.addtousercart = async (req, res) => {
	const { productId } = req.body;
	const user = await User.findOneAndUpdate(
		{ email: req.user.email },
		{ $addToSet: { addtocart: productId } }
	).exec();

	res.json({ ok: true });
};

exports.getcart = async (req, res) => {
	const list = await User.findOne({ email: req.user.email })
		.select("addtocart")
		.populate("addtocart")
		.exec();

	res.json(list);
};

exports.removeUsercart = async (req, res) => {
	const { productId } = req.params;
	const user = await User.findOneAndUpdate(
		{ email: req.user.email },
		{ $pull: { addtocart: productId } }
	).exec();

	res.json({ ok: true });
};

// createcashOrder;
exports.createcashOrder = async (req, res) => {
	const { COD, couponApplied } = req.body;
	const monthNames = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	const d = new Date();
	const nameofcurrentmonth = monthNames[d.getMonth()];
	console.log(nameofcurrentmonth);
	obj = { thetop: nameofcurrentmonth };
	console.log("month name : ", obj.thetop);

	const id = generateUniqueId({
		length: 16,
	});
	// console.log("PaymentIntent : ", paymentIntent);
	if (!COD) {
		return res.status(400).send("Create Cash on Delivery Failed");
	}
	const user = await User.findOne({ email: req.user.email }).exec();

	let userCart = await Cart.findOne({ orderBy: user._id }).exec();
	// console.log(username, useremail);
	let finalamount = 0;
	if (couponApplied && userCart.totalAfterDisc) {
		finalamount = userCart.totalAfterDisc;
	} else {
		finalamount = userCart.cartTotal;
	}
	let date = new Date();
	let timestamp = Math.floor(date.getTime() / 1000.0);
	console.log("products info: ", userCart.products);

	const updateeachmonth = async (prod) => {
		console.log("prod data: ", obj.thetop);

		const updatemonthly = await Product.findByIdAndUpdate(
			{ _id: prod.product },
			{
				$inc: {
					[obj.thetop]: +prod.count,
				},
			}
		);
	};

	const updateMonthwiseSale = userCart.products.map((prod) => {
		updateeachmonth(prod);
	});

	let newOrder = await new Ordermodel({
		products: userCart.products,
		deliveryLocation: userCart.deliveryLocation,
		userphoneno: userCart.userphoneno,
		username: userCart.username,
		useremail: userCart.useremail,

		totalAfterDisc: userCart.totalAfterDisc,
		invoiceid: id,
		paymentIntent: {
			id,
			amount: finalamount,
			currency: "tk",
			status: "Cash On Delivery",
			created: timestamp,
			payment_method_types: ["cash"],
		},
		orderBy: user._id,
		status: "Cash on Delivery",
	}).save();
	let Opt = userCart.products.map((item) => {
		return {
			updateOne: {
				filter: { _id: item.product._id },
				update: {
					$inc: { quantity: -item.count, sold: +item.count },
				},
			},
		};
	});
	let updated = await Product.bulkWrite(Opt, {});
	console.log("Updated : ", updated);
	console.log("New Order Saved : ", newOrder);

	res.json({ ok: true });
};

exports.sendfeedback = async (req, res) => {
	console.log("sdfjksadfjsk sadkjfkskfskjldajkskjdfsk");
	const { email, name, feedbackdetails } = req.body;
	console.log(name);
	console.log("feedbackdetails :", feedbackdetails);
	const feedback = await new feedbackschema({
		email,
		name,
		sendto: "jubairpulak77@gmail.com",
		message: feedbackdetails,
	}).save();

	console.log("send info", feedback);
	res.json(feedback);
	res.send("sdfs");
};
