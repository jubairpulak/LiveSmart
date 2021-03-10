const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const { ObjectId } = mongoose.Schema;

const productreviewSchema = new mongoose.Schema(
	{
		review: {
			type: String,
			required: true,
		},
		username: String,
		slug: String,
		// orderBy: String,
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Review", productreviewSchema);
