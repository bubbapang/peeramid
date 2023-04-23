// IMPORTING DEPENDENCIES WE NEED //

import { firstNames, lastNames, userNames, needs, mockHighlights, mockLowlights, mockSuggestions } from "./mockData.js";

// import mongoose and check config/keys.js for mongoURI
const mongoose = require("mongoose");
const { mongoURI: db } = require("../config/keys.js");

// import bcrypt
const bcrypt = require("bcryptjs");

// import models
const User = require("../models/User");
const Rating = require("../models/Rating");
const Suggestion = require("../models/Suggestion");

// import object id from mongoose types?
const { ObjectId } = require("mongoose").Types;

////////////////////////////////////////////////////////////////////////////////////////////////////////////
// HELPER FUNCTIONS //

// functions for dates
// function generatePastDate(daysAgo) {
// 	const date = new Date();
// 	date.setDate(date.getDate() - daysAgo);
// 	return date.toISOString();
// }

function getDate(dayOffset) {
	const date = new Date();
	date.setDate(date.getDate() - dayOffset);
	return date;
}

// init main arrays
const users = [];
const ratings = [];
const suggestions = [];

// mock data for 10 people
// init user IDs array to store for relationships
const IDs = [];

////////////////////////////////////////////////////////////////////////////////////////////////////////////
// LOOPS TO CREATE DATA, USING THE MOCK DATA //

// making users in a for loop
// users need: _id, firstName, lastName, username, email, hashedPassword, followers, and following IDs
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
	};

	// find a random number of followers and following IDs to put in the arrays
	// choose between 1-10 followers and following for each user
	const numFollowers = Math.floor(Math.random() * 10) + 1;
	const numFollowing = Math.floor(Math.random() * 10) + 1;

	// choose random IDs from IDs array
	for (let j = 0; j < numFollowers; j++) {
		const randomID = IDs[Math.floor(Math.random() * IDs.length)];
		if (!user.followers.includes(randomID)) {
			user.followers.push(randomID);
		}
	}
	for (let j = 0; j < numFollowing; j++) {
		const randomID = IDs[Math.floor(Math.random() * IDs.length)];
		if (!user.following.includes(randomID)) {
			user.following.push(randomID);
		}
	}

	// push user to users array and userID to IDs array
	users.push(user);
	IDs.push(user._id);
}

// for each user id, create 5 ratings. this is for general users
// for each user ID, create 2 suggestions objects
IDs.forEach((ID, idx) => {
	// for loop for ratings
	for (let i = 0; i < 5; i++) {
		// const randomNumber = Math.floor(Math.random() * 10) + 1

		const ratingId = new ObjectId();
		const rating = new Rating({
			// init the rating ID and the user ID that its tied to
			_id: ratingId,
			user: ID,

			// choosing random highlights and lowlights
			highlights:
				mockHighlights[
					Math.floor(Math.random() * mockHighlights.length)
				],
			lowlights:
				mockLowlights[Math.floor(Math.random() * mockLowlights.length)],

			// choosing random createdat and updatedat dates
			createdAt: getDate(5 - i),
			updatedAt: getDate(5 - i),
		});

		// for loop to create the 8 needs for each rating
		needs.forEach((need) => {
			rating[need] = Math.floor(Math.random() * 10) + 1;
		});

		// push the rating to the ratings array
		ratings.push(rating);
	}

	// for loop for suggestions
	for (let i = 0; i < 2; i++) {
		// choosing a random suggestion from the mock suggestions array
		const suggestionData =
			mockSuggestions[(idx + i) % mockSuggestions.length];

		// init suggestion object
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DEMO USER THINGS //

// demo user is messi. setting him as a variable
const demoUser = users[8];
const demoID = demoUser._id;

// init demoPins array
const demoPins = [];

// create 80 ratings for the DEMO USER
const numOfDemoUserRatings = 80;

// for loop to create the number of ratings for the DEMO USER
for (let i = 0; i < numOfDemoUserRatings; i++) {
	// making a new rating id for each rating
	const ratingId = new ObjectId();

	// creating the rating object, to later be saved to the database
	const rating = new Rating({
		// rating id and user id that its tied to
		_id: ratingId,
		user: demoID,

		// lights
		highlights:
			mockHighlights[Math.floor(Math.random() * mockHighlights.length)],
		lowlights:
			mockLowlights[Math.floor(Math.random() * mockLowlights.length)],

		// timestamps
		createdAt: getDate(numOfDemoUserRatings - i),
		updatedAt: getDate(numOfDemoUserRatings - i),
	});

	// for each need, create a random rating between 1 and 10 for the rating object
	needs.forEach((need) => {
		rating[need] = Math.floor(Math.random() * 10) + 1;
	});

	// push the rating object to the ratings array
	ratings.push(rating);
}

// create 5 suggestions for the DEMO USER
for (let i = 0; i < 5; i++) {
	// init new suggestion ID
	const suggestionId = new ObjectId();

	// pick a suggestion from the mock suggestions array
	const suggestionData = mockSuggestions[i % mockSuggestions.length];

	// init new suggestion object for the DEMO USER
	const suggestion = new Suggestion({
		// init the suggestion ID, the author of said suggestion, and the rating its tied to
		_id: suggestionId,
		user: demoID,
		dayRating: ratings[i]._id,

		// the body and need of the suggestion
		// if the dayrating is taken into account, then we dont need to keep track of the category tag
		body: suggestionData.body,
		categoryTag: suggestionData.categoryTag,

		pins: [demoID],
		likes: [demoID],
	});

	// adding the demo user's suggestions to the general suggestions array
	suggestions.push(suggestion);
	demoPins.push(suggestionId);
}

// Update the demo user's pins
users.find((user) => user._id === demoID).pins = demoPins;

////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SEEDING THE DATABASE //

mongoose
	.connect(db, { useNewUrlParser: true })
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
		// Drop the collections
		await User.collection.drop();
		await Rating.collection.drop();
		await Suggestion.collection.drop();

		// Insert the documents
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
