// import dependencies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create schema
const suggestionSchema = new Schema({
	body: {
		type: String,
		required: true,
	},
	categoryTag: {
		type: String,
		required: true,
	},
    pins: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
            optional: true,
        },
    ],
	likes: [
		{
			type: Schema.Types.ObjectId,
			ref: "User",
			optional: true,
		},
	],
	dislikes: [
		{
			type: Schema.Types.ObjectId,
			ref: "User",
			optional: true,
		},
	],
	dayRating: {
		type: Schema.Types.ObjectId,
		ref: "Rating",
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
});

// export suggestion model
module.exports = mongoose.model("Suggestion", suggestionSchema);
