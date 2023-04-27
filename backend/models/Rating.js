const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ratingSchema = new Schema(
	{
		transcendence: {
			type: Number,
			required: true,
		},
		actualization: {
			type: Number,
			required: true,
		},
		aesthetics: {
			type: Number,
			required: true,
		},
		cognition: {
			type: Number,
			required: true,
		},
		esteem: {
			type: Number,
			required: true,
		},
		love: {
			type: Number,
			required: true,
		},
		safety: {
			type: Number,
			required: true,
		},
		physiology: {
			type: Number,
			required: true,
		},
		highlight: {
			type: String,
			optional: true,
		},
		lowlight: {
			type: String,
			optional: true,
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Rating", ratingSchema);
