const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const feedbackSchema = new mongoose.Schema(
	{
		email: String,
		name: String,
		sendto: String,
		message: String,
		check: {
			type: Number,
			default: 0,
		},
		replied: {
			type: String,
			default: "No",
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Feedback", feedbackSchema);
