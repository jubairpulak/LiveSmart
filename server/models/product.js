const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			trim: true,
			required: true,
			maxlength: 32,
			text: true,
		},

		slug: {
			type: String,
			unique: true,
			lowercase: true,
			indexe: true,
		},

		description: {
			type: String,
			required: true,
			maxlength: 2000,
			text: true,
		},

		price: {
			type: Number,
			trim: true,
			required: true,
			maxlength: 32,
		},

		category: {
			type: ObjectId,
			ref: "Category",
		},

		subs: [
			{
				type: ObjectId,
				ref: "Sub",
			},
		],
		quantity: {
			type: Number,
		},
		sold: {
			type: Number,
			default: 0,
		},
		images: {
			type: Array,
		},
		shipping: {
			type: String,
			enum: ["Yes", "No"],
		},
		color: {
			type: String,
			enum: [
				"Black",
				"Brown",
				"Silver",
				"White",
				"Blue",
				"Red",
				"RGB",
			],
		},
		January: {
			type: Number,
			default: 0,
		},
		February: {
			type: Number,
			default: 0,
		},
		March: {
			type: Number,
			default: 0,
		},
		April: {
			type: Number,
			default: 0,
		},
		May: {
			type: Number,
			default: 0,
		},
		June: {
			type: Number,
			default: 0,
		},
		July: {
			type: Number,
			default: 0,
		},
		Augast: {
			type: Number,
			default: 0,
		},
		September: {
			type: Number,
			default: 0,
		},
		October: {
			type: Number,
			default: 0,
		},
		November: {
			type: Number,
			default: 0,
		},
		December: {
			type: Number,
			default: 0,
		},

		brand: {
			type: String,
			enum: [
				"First alert",
				"Zcombo",
				"Google",
				"Filtrete",
				"Hisense",
				"Samsung",
				"TCL",
				"Kasa",
				"Lutron",
				"Govee",
				"Lumimam",
				"Philips",
				"Blink Home",
				"Wyze",
				"Wuze",
				"Ring",
				"Sony",
				"Amazon",
				"Wemo",
				"Genie",
				"MyQ",
				"Kwikset",
				"Schlage",
			],
		},
		ratings: [
			{
				star: Number,
				postedBy: { type: ObjectId, ref: "User" },
			},
		],

		review: [
			{
				comment: String,
				username: String,
				review_time: {
					type: Date,
					default: Date.now(),
				},
			},
		],
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
