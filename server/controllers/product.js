const product = require("../models/product");
const slugify = require("slugify");
const User = require("../models/user");
const Couponmodel = require("../models/coupon");

exports.create = async (req, res) => {
	try {
		console.log(req.body);
		req.body.slug = slugify(req.body.title);
		const newProduct = await new product(req.body).save();
		res.json(newProduct);
	} catch (err) {
		console.log(err);
		//res.status(400).send("Create Product failed")
		res.status(400).json({
			err: err.message,
		});
	}
};

exports.listAll = async (req, res) => {
	let products = await product
		.find({})
		.limit(parseInt(req.params.count))
		.populate("category")
		.populate("subs")
		.sort([["createdAt", "desc"]])
		.exec();

	res.json(products);
};

exports.remove = async (req, res) => {
	try {
		const deleted = await product
			.findOneAndRemove({ slug: req.params.slug })
			.exec();
		res.json(deleted);
	} catch (err) {
		console.log(err);
		return res.status(400).send("Product Delete Failed");
	}
};

exports.read = async (req, res) => {
	const Product = await product
		.findOne({ slug: req.params.slug })
		.populate("category")
		.populate("subs")
		.exec();
	console.log("product");
	const coupon = await Couponmodel.find({}).sort({ createdAt: -1 }).exec();
	res.json({ Product: Product, coupon: coupon });
	console.log(coupon);
};

exports.update = async (req, res) => {
	try {
		if (req.body.title) {
			req.body.slug = slugify(req.body.title);
		}
		const updated = await product
			.findOneAndUpdate({ slug: req.params.slug }, req.body, {
				new: true,
			})
			.exec();
		res.json(updated);
	} catch (err) {
		console.log("Product Update Error ", err);
		// return res.status(400).send("Product Update Failed");
		res.status(400).json({
			err: err.message,
		});
	}
};

exports.list = async (req, res) => {
	try {
		//sort on date , order desc , limit 3
		const { sort, order, page } = req.body;
		const currentPage = page || 1;
		const perPage = 3;
		const products = await product
			.find({})
			.skip((currentPage - 1) * perPage)
			.populate("category")
			.populate("subs")
			.sort([[sort, order]])
			.limit(perPage)
			.exec();

		res.json(products);
	} catch (err) {
		console.log(err);
	}
};

//get products from product schema
exports.productsCount = async (req, res) => {
	let total = await product.find({}).estimatedDocumentCount().exec();
	console.log("total count : ", total);
	res.json(total);
};

exports.productStar = async (req, res) => {
	const Product = await product.findById(req.params.productId).exec();
	const user = await User.findOne({ email: req.user.email }).exec();
	console.log(user);
	const { star } = req.body;
	console.log("Star", star);
	// Who is updating?
	//check if currently logged in user have already added ratings to this product?
	let existingRatingObject = Product.ratings.find(
		(e) => e.postedBy.toString() === user._id.toString()
	);
	if (existingRatingObject === undefined) {
		let ratingAdded = await product
			.findByIdAndUpdate(
				Product._id,
				{
					$push: { ratings: { star, postedBy: user._id } },
				},
				{ new: true }
			)
			.exec();
		console.log("ratingAdded", ratingAdded);
		res.json(ratingAdded);
	} else {
		const ratingUpdate = await product
			.updateOne(
				{
					ratings: { $elemMatch: existingRatingObject },
				},
				{ $set: { "ratings.$.star": star } },
				{ new: true }
			)
			.exec();
		console.log("ratingUpdate", ratingUpdate);
		res.json(ratingUpdate);
	}
};

exports.listRelated = async (req, res) => {
	const Product = await product.findById(req.params.productId).exec();

	const related = await product
		.find({
			_id: { $ne: Product._id },
			category: Product.category,
		})
		.limit(3)
		.populate("category")
		.populate("subs")
		.populate("postedBy")
		.exec();

	if (!related) {
		console.log("Not found");
	}

	res.json(related);
};
const handleQuery = async (req, res, query) => {
	const products = await product
		.find({ $text: { $search: query } })
		.populate("category", "_id name")
		.populate("subs", "_id name")
		.populate("postedBy", "_id name")
		.exec();

	res.json(products);
};

const handlePrice = async (req, res, price) => {
	try {
		let products = await product
			.find({
				price: {
					$gte: price[0],
					$lte: price[1],
				},
			})
			.populate("category", "_id name")
			.populate("subs", "_id name")
			.populate("postedBy", "_id name")
			.exec();
		res.json(products);
	} catch (error) {
		console.log(error);
	}
};

const handleCategory = async (req, res, category) => {
	try {
		let products = await product
			.find({ category })
			.populate("category", "_id name")
			.populate("subs", "_id name")
			.populate("postedBy", "_id name")
			.exec();

		res.json(products);
	} catch (error) {
		console.log(error);
	}
};
const hanldeStar = (req, res, stars) => {
	try {
		product
			.aggregate([
				{
					$project: {
						document: "$$ROOT",
						floorAverage: {
							$floor: { $avg: "$ratings.star" },
						},
					},
				},
				{
					$match: { floorAverage: stars },
				},
			])
			.limit(12)
			.exec((err, agg) => {
				if (err) console.log("Agggrate Error", err);
				product
					.find({ _id: agg })
					.populate("category", "_id name")
					.populate("subs", "_id name")
					.populate("postedBy", "_id name")
					.exec((err, prod) => {
						if (err) {
							console.log("Product Agg Err : ", err);
						} else {
							res.json(prod);
						}
					});
			});
	} catch (error) {
		console.log(error);
	}
};

const handleSub = async (req, res, sub) => {
	const prod = await product
		.find({ subs: sub })
		.populate("category", "_id name")
		.populate("subs", "_id name")
		.populate("postedBy", "_id name")
		.exec();

	res.json(prod);
};

const handleShipping = async (req, res, shipping) => {
	const prod = await product
		.find({ shipping })
		.populate("category", "_id name")
		.populate("subs", "_id name")
		.populate("postedBy", "_id name")
		.exec();

	res.json(prod);
};
const handleColor = async (req, res, color) => {
	const prod = await product
		.find({ color })
		.populate("category", "_id name")
		.populate("subs", "_id name")
		.populate("postedBy", "_id name")
		.exec();

	res.json(prod);
};
const handleBrand = async (req, res, brand) => {
	const prod = await product
		.find({ brand })
		.populate("category", "_id name")
		.populate("subs", "_id name")
		.populate("postedBy", "_id name")
		.exec();

	res.json(prod);
};

exports.searchFilters = async (req, res) => {
	const {
		query,
		price,
		category,
		stars,
		sub,
		shipping,
		brand,
		color,
	} = req.body;
	if (query) {
		console.log("query", query);
		await handleQuery(req, res, query);
	}

	if (price !== undefined) {
		console.log("Price : ", price);
		await handlePrice(req, res, price);
	}

	if (category) {
		console.log("Category : ", category);
		await handleCategory(req, res, category);
	}

	if (stars) {
		console.log("Category : ", stars);
		await hanldeStar(req, res, stars);
	}

	if (sub) {
		console.log("Sub--->", sub);
		await handleSub(req, res, sub);
	}
	if (shipping) {
		console.log("Shipping--->", shipping);
		await handleShipping(req, res, shipping);
	}
	if (color) {
		console.log("Color--->", color);
		await handleColor(req, res, color);
	}
	if (brand) {
		console.log("Brand--->", brand);
		await handleBrand(req, res, brand);
	}
};
