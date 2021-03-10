const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const monthlysale = new mongoose.Schema(
	{
		abc: {
			type: String,
			default: "slug",
		},
		January: Number,
		February: Number,
		March: Number,
		April: Number,
		May: Number,
		June: Number,
		July: Number,
		Aguast: Number,
		September: Number,
		October: Number,
		November: Number,
		December: Number,
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Monthlysale", monthlysale);
