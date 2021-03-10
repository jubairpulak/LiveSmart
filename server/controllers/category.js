const Category = require("../models/category");
const Sub = require("../models/sub");
const slugify = require("slugify");
const Product = require("../models/product");

exports.create = async (req, res) => {
	try {
		const { name } = req.body;
		const category = await new Category({
			name,
			slug: slugify(name),
		}).save();
		res.json(category);
	} catch (err) {
		console.log(err);
		res.status(400).send("Create category failed");
	}
};

exports.list = async (req, res) => {
	res.json(await Category.find({}).sort({ createdAt: -1 }).exec());
};
exports.read = async (req, res) => {
	let category = await Category.findOne({ slug: req.params.slug }).exec();
	console.log("category", category);
	const products = await Product.find({ category })
		.populate("Category")
		.exec();

	res.json({
		category,
		products,
	});
};

exports.update = async (req, res) => {
	const { name } = req.body;
	try {
		const updated = await Category.findOneAndUpdate(
			{ slug: req.params.slug },
			{ name, slug: slugify(name) },
			{ new: true }
		);
		res.json(updated);
	} catch (err) {
		console.log(err);
		res.status(400).send("Category update failed");
	}
};

exports.remove = async (req, res) => {
	try {
		const deleted = await Category.findOneAndDelete({
			slug: req.params.slug,
		});
		res.json(deleted);
	} catch (err) {
		res.status(400).send("Category delete failed");
	}
};

exports.getSubs = (req, res) => {
	console.log("id is : ", req.params._id);
	Sub.find({ parent: req.params._id }).exec((err, subs) => {
		if (err) console.log(err);
		res.json(subs);
		console.log("subdata :", subs);
	});
};
