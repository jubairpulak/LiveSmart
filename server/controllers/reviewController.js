const Usermodel = require("../models/user");
const ProductModel = require("../models/product");
const ReviewModel = require("../models/productreview");

exports.createReview = async (req, res) => {
	const { review } = req.body;
	const slug = req.params.slug;
	console.log("Review ", review);
	// console.log("hy i am running");
	const user = await Usermodel.findOne({ email: req.user.email }).exec();
	const filter = { slug: req.params.slug };
	let commentdata = await ProductModel.findOneAndUpdate(filter, {
		$push: { review: { comment: review, username: user.name } },
	}).exec();

	const ReviewMake = await new ReviewModel({
		review: review,
		username: user.name,
		slug,
	}).save();

	console.log("Review  INfo You can check : ", ReviewMake);

	// const user = await User.findOneAndUpdate(
	// 	{ slug: req.user.email },
	// 	{ $addToSet: { wishlist: productId } }
	// ).exec();
	// let newReview = await new ReviewModel({
	// 	review: review,
	// 	username: user.name,
	// 	slug: req.params.slug,
	// 	orderBy: req.params.slug,
	// }).save();

	// const Product = await ProductModel.findOne({
	// 	slug: req.params.slug,
	// }).exec();
	res.json(ReviewMake);
	console.log("review : ", ReviewMake);

	// const user = await User.findOne({ email: req.user.email }).exec();
	// console.log("New Cart  --->: ", Product);
	// res.json({ ok: true });
};

// exports.getReview = async (req, res) => {
// 	console.log("hy i am running");
// 	console.log("slug :", req.params.slug);
// 	const reviewinfo = await ProductModel.findOne({
// 		slug: req.params.slug,
// 	}).exec();
// 	res.json({ rev: reviewinfo.review });
// };
exports.getReview = async (req, res) => {
	// console.log("hy i am running");
	// console.log("slug :", req.params.slug);
	// const reviewinfo = await ReviewModel.find({
	// 	slug: req.params.slug,
	// }).exec();
	// res.json(reviewinfo);
	try {
		//sort on date , order desc , limit 3
		const { sort, order, page } = req.body;
		console.log("mamu slug paichi : ", sort, order, page);

		console.log(sort, order, page);
		const currentPage = page || 1;
		const perPage = 2;
		const reviewinfo = await ReviewModel.find({ slug: req.params.slug })
			.skip((currentPage - 1) * perPage)
			.sort([[sort, order]])
			.limit(perPage)
			.exec();

		res.json(reviewinfo);
		console.log("slug er sokol tottho : ", reviewinfo);
	} catch (err) {
		console.log(err);
	}
};

exports.getReviewbyCount = async (req, res) => {
	const { slug } = req.body;
	console.log("mamu slug paichi : ", slug);
	let total = await ReviewModel.find({ slug: slug })
		.estimatedDocumentCount()
		.exec();
	console.log("mot slug hoilo : ", total);
	res.json(total);
};
