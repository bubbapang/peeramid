const express = require("express");
const router = express.Router();
// Other required imports
const mongoose = require("mongoose");
const Rating = mongoose.model("Rating");
const Suggestion = mongoose.model("Suggestion");
const User = mongoose.model("User");

const { restoreUser, requireUser } = require("../../config/passport");
const { isProduction } = require("../../config/keys");

// Route handlers for getting user data such as ratings, suggestions, pins, likes, and dislikes
/* GET users listing. */
router.get("/", function (res) {
	res.json({
		message: "GET /api/users",
	});
});

// implemented seach query for users, here regex means regular expression helps in pattern matching, options helps in making the query case-insensitive
// So, we find the users by the options, and select the fields we need and return them
// SEARCH FOR USERS
router.get("/search", async (req, res, next) => {
	const searchQuery = req.query.q;
	try {
		const users = await User.find({
			$or: [
				{ username: { $regex: searchQuery, $options: "i" } },
				{ firstName: { $regex: searchQuery, $options: "i" } },
				{ lastName: { $regex: searchQuery, $options: "i" } },
			],
		}).select("_id username firstName lastName");
		res.json(users);
	} catch (err) {
		next(err);
	}
});

// GET DISLIKES BY THE USER
router.get("/dislikes", requireUser, async (req, res, next) => {
	try {
		const currentUser = await User.findById(req.user._id).populate(
			"dislikes"
		);
		if (!currentUser) {
			return res.status(404).json({ message: "Current user not found" });
		}
		return res.json(currentUser.dislikes);
	} catch (err) {
		next(err);
	}
});

router.get("/current", restoreUser, (req, res) => {
	if (!isProduction) {
		const csrfToken = req.csrfToken();
		res.cookie("CSRF-TOKEN", csrfToken);
	}
	if (!req.user) return res.json(null);
	res.json({
		...req.user._doc,
	});
});

// ID ROUTES

router.get("/:id", async (req, res) => {
	try {
		const user = await User.findById(req.params.id);

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		res.json(user);
	} catch (error) {
		console.error("Error in GET /:id route", error);
		res.status(500).json({ message: "Error getting user by ID" });
	}
});

// GET USERS RATINGS
router.get("/:id/ratings", async (req, res, next) => {
	const visitedUser = await User.findById(req.params.id);

	try {
		const ratings = await Rating.find({ user: visitedUser._id }).populate(
			"user",
			"_id username"
		);
		if (!ratings) {
			return res.status(404).json({ message: "Rating not found" });
		}
		return res.json(ratings);
	} catch (err) {
		next(err);
	}
});

// GET USER'S RATEDTODAY ATTRIBUTE
router.get("/:id/ratedtoday", restoreUser, async (req, res, next) => {
	const currentUser = req.user;
	try {
		if (!currentUser) {
			return res.status(404).json({ message: "User not found" });
		}
		return res.status(200).json({ ratedToday: currentUser.ratedToday });
	} catch (err) {
		return next(err);
	}
});

// GET SUGGESTIONS USER MADE
router.get("/:id/suggestions", requireUser, async (req, res, next) => {
	try {
		const suggestions = await Suggestion.find({ user: req.params.id });

		if (!suggestions) {
			return res.status(404).json({ message: "Suggestion not found" });
		}
		return res.json(suggestions);
	} catch (err) {
		next(err);
	}
});

// GET PINS BY THE USER
router.get("/:id/pins", async (req, res, next) => {
	const currentUser = req.user;
	try {
		const user = await User.findById(req.params.id).populate("pins");
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		const visiblePins = [];

		for (const pin of user.pins) {
			const suggestion = await Suggestion.findById(pin._id).populate(
				"user",
				"_id public"
			);
			const author = suggestion.user;
			if (
				author.public ||
				(currentUser && currentUser.following.includes(author._id))
			) {
				visiblePins.push(suggestion);
			}
		}

		return res.json(visiblePins);
	} catch (err) {
		next(err);
	}
});

// GET LIKES BY THE USER
router.get("/:id/likes", async (req, res, next) => {
	const currentUser = req.user;
	try {
		const user = await User.findById(req.params.id).populate("likes");
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		const visibleLikes = [];

		for (const like of user.likes) {
			const suggestion = await Suggestion.findById(like._id).populate(
				"user",
				"_id public"
			);
			const author = suggestion.user;
			if (
				author.public ||
				(currentUser && currentUser.following.includes(author._id))
			) {
				visibleLikes.push(like);
			}
		}

		return res.json(visibleLikes);
	} catch (err) {
		next(err);
	}
});

module.exports = router;
