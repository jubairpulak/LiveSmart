const orderModel = require("../models/order");
const productModel = require("../models/product");
const UserModel = require("../models/user");
const feedbackSchema = require("../models/feedback");
const moment = require("moment");
exports.order = async (req, res) => {
	try {
		//sort on date , order desc , limit 3
		const { sort, order, page } = req.body;
		console.log(sort, order, page);
		const currentPage = page || 1;
		const perPage = 5;
		const Showorders = await orderModel
			.find({})
			.populate("products.product")
			.skip((currentPage - 1) * perPage)
			.sort([[sort, order]])
			.limit(perPage)
			.exec();

		res.json(Showorders);
	} catch (err) {
		console.log(err);
	}
};
exports.searchorder = async (req, res) => {
	try {
		//sort on date , order desc , limit 3
		const { sort, order, epocdate, endepocdate } = req.body;
		console.log("search date", sort, order, epocdate);
		console.log("endepoc", endepocdate);
		const counday =
			Math.abs(
				moment(epocdate, "YYYY-MM-DD")
					.startOf("day")
					.diff(
						moment(endepocdate, "YYYY-MM-DD").startOf("day"),
						"days"
					)
			) + 1;

		console.log("Days : ", counday);
		let getdata, getsoldinfo;
		if (endepocdate === epocdate) {
			const onedayafter = moment(epocdate)
				.add(1, "day")
				.format("YYYY-MM-DD");
			console.log("oneday after", onedayafter);

			getdata = await orderModel
				.find({
					createdAt: { $gte: epocdate, $lt: onedayafter },
				})
				.populate("products.product")
				.sort([["createdAt", "desc"]])
				.exec();
		} else {
			console.log("loss");
			const onedayafter = moment(endepocdate)
				.add(1, "day")
				.format("YYYY-MM-DD");
			console.log("oneday after", onedayafter);
			getdata = await orderModel
				.find({
					createdAt: { $gte: epocdate, $lte: onedayafter },
				})
				.populate("products.product")
				.sort([["createdAt", "desc"]])
				.exec();
		}

		console.log("get date", getdata.length);

		res.json({
			getdata: getdata,
			countday: counday,
		});
	} catch (err) {
		console.log(err);
	}
};
exports.orderstatus = async (req, res) => {
	const { orderId, orderStatus } = req.body;
	let updateStatus = await orderModel.findByIdAndUpdate(
		orderId,
		{
			orderStatus,
		},
		{ new: true }
	);
	res.json(updateStatus);
};

//last one
exports.singleorder = async (req, res) => {
	// const ab = "paymentIntent.id";
	const { orderId } = req.body;
	console.log("Invoice ID :", orderId);
	let Showorders = await orderModel
		.findOne({ invoiceid: orderId })
		.populate("products.product")
		.exec();
	console.log("Order info : ", Showorders);
	res.json({ singledetails: Showorders });
};
exports.sendproducts = async (req, res) => {
	let adminproducts = await productModel
		.find(
			{},
			"title sold January February March April May June July August September October November December -_id"
		)
		.exec();

	let productssoldprice = await orderModel
		.find({}, "paymentIntent.amount -_id")
		.exec();
	console.log("product Price : ", productssoldprice);

	res.json({ adminprod: adminproducts, SoldTkamount: productssoldprice });
};
exports.getadminallusers = async (req, res) => {
	try {
		//sort on date , order desc , limit 3
		const { sort, order, page } = req.body;
		console.log("sort, order, page : ", sort, order, page);
		const currentPage = page || 1;
		const perPage = 2;
		const getuserlist = await UserModel.find({
			role: { $nin: ["admin"] },
		})
			.skip((currentPage - 1) * perPage)
			.sort([[sort, order]])
			.limit(perPage)
			.exec();
		const getAdminList = await UserModel.find({
			role: { $nin: ["subscriber"] },
		});
		res.json({ getuserlist: getuserlist, getAdminList: getAdminList });
		console.log(getuserlist.length);
	} catch (err) {
		console.log(err);
	}
};
exports.getallmails = async (req, res) => {
	// const { email } = req.body;

	const getmails = await feedbackSchema
		.find({})
		.sort({ updatedAt: +1 })
		.exec();

	try {
		//sort on date , order desc , limit 3
		const { sort, order, page } = req.body;
		console.log(sort, order, page);
		const currentPage = page || 1;
		const perPage = 5;
		const getmails = await feedbackSchema
			.find({})
			.skip((currentPage - 1) * perPage)
			.sort([[sort, order]])
			.limit(perPage)
			.exec();

		res.json(getmails);
		console.log(getmails);

		res.json;
	} catch (err) {
		console.log(err);
	}
};

exports.makeadmin = async (req, res) => {
	const { email } = req.body;

	const filter = { email: email };
	const update = { role: "admin" };
	let updaterole = await UserModel.findOneAndUpdate(filter, update, {
		new: true,
	});
	console.log("update user :", updaterole);
	res.json({ updaterole });
};
exports.checkmails = async (req, res) => {
	const { email } = req.body;

	const filter = { email: email };
	const update = { check: 1 };
	let updaterole = await feedbackSchema.findOneAndUpdate(filter, update, {
		new: true,
	});
	console.log("update user :", updaterole);
	res.json({ updaterole });
};
exports.senddatafeedback = async (req, res) => {
	const { email, replieddata } = req.body;

	const filter = { email: email };
	const update = { replied: "Yes" };
	let updatereplieddata = await feedbackSchema.findOneAndUpdate(filter, update, {
		new: true,
	});
	console.log("update user :", updatereplieddata);
	res.json({ updatereplieddata});
};

exports.mailsCount = async (req, res) => {
	let total = await feedbackSchema.find({}).estimatedDocumentCount().exec();
	console.log("total count : ", total);
	res.json(total);
};
exports.userCount = async (req, res) => {
	let total = await UserModel.find({ role: { $nin: ["admin"] } })
		.estimatedDocumentCount()
		.exec();
	console.log("total count : ", total);
	res.json(total);
};
exports.OrderCount = async (req, res) => {
	let total = await orderModel.find({}).estimatedDocumentCount().exec();
	let totaluser = await UserModel.find({}).estimatedDocumentCount().exec();
	let totalcompleteorder = await orderModel
		.find({ orderStatus: "Completed" })
		.countDocuments();
	console.log("totalcompletedOrder", totalcompleteorder);
	console.log("total order : ", total);
	res.json({
		total: total,
		totalcompleteorder: totalcompleteorder,
		totaluser: totaluser,
	});
};
