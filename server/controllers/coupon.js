const Couponmodel = require("../models/coupon");

exports.create = async (req, res) => {
	try {
		const { nam, expir, discount } = req.body.coupon;
		res.json(await new Couponmodel({ nam, expir, discount }).save());
	} catch (err) {
		console.log(err);
	}
};
exports.remove = async (req, res) => {
	try {
		res.json(
			await Couponmodel.findByIdAndDelete(req.params.couponId).exec()
		);
	} catch (err) {
		console.log(err);
	}
};
exports.list = async (req, res) => {
	try {
		res.json(await Couponmodel.find({}).sort({ createdAt: -1 }).exec());
	} catch (err) {
		console.log(err);
	}
};
