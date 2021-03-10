const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const cuponSchema = new mongoose.Schema(
	{
		nam: {
			type: String,
			trim: true,
			unique: true,
			uppercase: true,
			required: "Name is Required",
			minlength: [8, "very sort"],
			maxlength: [14, "Too long"],
		},
		expir: {
			type: Date,
			required: true,
		},
		discount: {
			type: Number,
			required: true,
		},
	},

	{ timestamps: true }
);

module.exports = mongoose.model("Cupon", cuponSchema);
