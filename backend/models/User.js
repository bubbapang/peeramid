const mongoose = require("mongoose");
const Suggestion = require("./Suggestion");
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		hashedPassword: {
			type: String,
			required: true,
		},
		public: {
			type: Boolean,
			default: true,
		},
		pins: [
			{
				type: Schema.Types.ObjectId,
				ref: "Suggestion",
				optional: true,
			},
		],
		likes: [
			{
				type: Schema.Types.ObjectId,
				ref: "Suggestion",
				optional: true,
			},
		],
		dislikes: [
			{
				type: Schema.Types.ObjectId,
				ref: "Suggestion",
				optional: true,
			},
		],
		following: [
			{
				type: Schema.Types.ObjectId,
				ref: "User",
			},
		],
		followers: [
			{
				type: Schema.Types.ObjectId,
				ref: "User",
			},
		],
		followRequest: [
			{
				type: Schema.Types.ObjectId,
				ref: "User",
			},
		],
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("User", userSchema);
