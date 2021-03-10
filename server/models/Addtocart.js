const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const AddtocartSchema = new mongoose.Schema(
	{
		products: [
			{
				product: {
					type: ObjectId,
					ref: "Product",
				},
			},
		],

		orderBy: { type: ObjectId, ref: "User" },
	},

	{ timestamps: true }
);

module.exports = mongoose.model("AddToCart", AddtocartSchema);
