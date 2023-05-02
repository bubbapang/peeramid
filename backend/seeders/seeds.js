require("dotenv").config({ path: "./backend/.env" });
const {
	firstNames,
	lastNames,
	userNames,
	needs,
	mockHighlights,
	mockLowlights,
	mockSuggestions,
} = require("./mockData.js");
const mongoose = require("mongoose");
const { mongoURI: db } = require("../config/keys.js");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Rating = require("../models/Rating");
const Suggestion = require("../models/Suggestion");
const { ObjectId } = require("mongoose").Types;

const getDate = (dayOffset) => {
	const date = new Date();
	date.setDate(date.getDate() - dayOffset);
	return date;
};

const users = [],
	ratings = [],
	suggestions = [],
	IDs = [];

for (let i = 0; i < 10; i++) {
	const user = {
		_id: new ObjectId(),
		firstName: firstNames[i],
		lastName: lastNames[i],
		username: userNames[i],
		email: `${firstNames[i].toLowerCase()}@gmail.com`,
		hashedPassword: bcrypt.hashSync("password", 10),
		followers: [],
		following: [],
		pins: [],
	};

	for (let j = 0; j < 11; j++) {
		const randomID = IDs[Math.floor(Math.random() * IDs.length)];
		if (!user.followers.includes(randomID)) user.followers.push(randomID);
		if (!user.following.includes(randomID)) user.following.push(randomID);
	}
	users.push(user);
	IDs.push(user._id);
}

const demoUser = users[8],
	demoID = demoUser._id,
	demoPins = [],
	numOfDemoUserRatings = 80;
const numOfSuggestions = 5;

IDs.forEach((ID, idx) => {
	for (let i = 0; i < 5; i++) {
		const ratingId = new ObjectId();
		const rating = new Rating({
			_id: ratingId,
			user: ID,
			highlight:
				mockHighlights[
					Math.floor(Math.random() * mockHighlights.length)
				],
			lowlight:
				mockLowlights[Math.floor(Math.random() * mockLowlights.length)],
			createdAt: getDate(5 - i),
			updatedAt: getDate(5 - i),
		});
		needs.forEach(
			(need) => (rating[need] = Math.floor(Math.random() * 10) + 1)
		);
		ratings.push(rating);
	}

	for (let i = 0; i < 2; i++) {
		const suggestionData =
			mockSuggestions[(idx + i) % mockSuggestions.length];
		const suggestion = new Suggestion({
			_id: new ObjectId(),
			user: ID,
			dayRating: ratings[idx]._id,
			body: suggestionData.body,
			categoryTag: suggestionData.categoryTag,
			pins: [demoID],
			likes: [demoID],
		});
		suggestions.push(suggestion);
	}
});

for (let i = 0; i < numOfDemoUserRatings; i++) {
	const ratingId = new ObjectId();
	const rating = new Rating({
		_id: ratingId,
		user: demoID,
		highlight:
			mockHighlights[Math.floor(Math.random() * mockHighlights.length)],
		lowlight:
			mockLowlights[Math.floor(Math.random() * mockLowlights.length)],
		createdAt: getDate(numOfDemoUserRatings - i),
		updatedAt: getDate(numOfDemoUserRatings - i),
	});
	needs.forEach(
		(need) => (rating[need] = Math.floor(Math.random() * 10) + 1)
	);
	ratings.push(rating);
}

for (let i = 0; i < numOfSuggestions; i++) {
	const suggestionId = new ObjectId(),
		suggestionData = mockSuggestions[i % mockSuggestions.length];
	const suggestion = new Suggestion({
		_id: suggestionId,
		user: demoID,
		dayRating: ratings[i]._id,
		body: suggestionData.body,
		categoryTag: suggestionData.categoryTag,
		pins: [demoID],
		likes: [demoID],
	});
	suggestions.push(suggestion);
	demoPins.push(suggestionId);
}

users.find((user) => user._id === demoID).pins = demoPins;

mongoose
	.connect(db, { useNewUrlParser: true }) // here we connect to the database
	.then(() => {
		console.log("Connected to MongoDB successfully");
		insertSeeds();
	})
	.catch((err) => {
		console.error(err.stack);
		process.exit(1);
	});

const insertSeeds = async () => {
	console.log("Resetting db and seeding users...");
	try {
		await User.deleteMany({});
		await Rating.deleteMany({});
		await Suggestion.deleteMany({});
		await User.insertMany(users);
		await Rating.insertMany(ratings);
		await Suggestion.insertMany(suggestions);
		console.log("Done!");
		mongoose.disconnect();
	} catch (err) {
		console.error(err.stack);
		process.exit(1);
	}
};
