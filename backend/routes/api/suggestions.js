const express = require("express");
const router = express.Router();
const { requireUser } = require("../../config/passport");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Suggestion = mongoose.model("Suggestion");

router.get("/", async (req, res, next) => {
	try {
		const suggestions = await Suggestion.find()
			.populate("user", "_id username public")
			.populate({
				path: "dayRating",
				populate: {
					path: "user",
					model: "User",
					select: "_id public",
				},
			});

		if (suggestions.length === 0) {
			return res.status(404).json({ message: "Suggestion not found" });
		}
		return res.json(suggestions);
	} catch (err) {
		next(err);
	}
});

// Get all public suggestions under a certain category
router.get("/:categoryTag", async (req, res, next) => {
	try {
		const suggestions = await Suggestion.find({
			categoryTag: req.params.categoryTag,
		})
			.populate("user", "_id public")
			.populate({
				path: "dayRating",
				populate: {
					path: "user",
					model: "User",
					select: "_id public",
				},
			});

		const publicSuggestions = suggestions.filter((suggestion) => {
			return suggestion.user.public && suggestion.dayRating.user.public;
		});

		if (!publicSuggestions) {
			return res.status(404).json({ message: "Suggestion not found" });
		}
		return res.json(publicSuggestions);
	} catch (err) {
		next(err);
	}
});

// Delete a suggestion
router.delete("/:id", requireUser, async (req, res, next) => {
	const currentUser = req.user;
	const suggestionId = req.params.id;

	try {
		const suggestion = await Suggestion.findById(suggestionId);
		if (suggestion.user.toString() !== currentUser._id.toString()) {
			return res.status(404).json({ message: "Not Authorized" });
		}
		if (!suggestion) {
			return res.status(404).json({ message: "Suggestion not found" });
		}
		await Suggestion.findByIdAndDelete(suggestionId);
		return res.status(200).json({ message: "Suggestion deleted" });
	} catch (err) {
		next(err);
	}
});

// Update a suggestion
router.put("/:id", requireUser, async (req, res, next) => {
	const currentUser = req.user;
	const suggestionId = req.params.id;
	const updatedData = req.body;

	try {
		let suggestion = await Suggestion.findById(suggestionId);

		if (!suggestion) {
			return res.status(404).json({ message: "Suggestion not found" });
		}

		if (suggestion.user.toString() !== currentUser._id.toString()) {
			return res.status(403).json({ message: "Not Authorized" });
		}

		Object.assign(suggestion, updatedData);
		await suggestion.save();

		suggestion = await Suggestion.populate(suggestion, [
			{ path: "dayRating", select: "_id" },
			{ path: "user", select: "_id username" },
		]);

		return res.json(suggestion);
	} catch (err) {
		next(err);
	}
});

// Pin a suggestion
router.post("/:id/pin", requireUser, async (req, res, next) => {
	const currentUser = req.user;
	const suggestionId = req.params.id;
	try {
		// return res.status(400).json({message: `${suggestionId}`})
		if (!currentUser) {
			return res.status(404).json({ message: "Current user not found" });
		}
		// Check if user has already liked the suggestion
		if (currentUser.pins.includes(suggestionId)) {
			// Remove the dislike
			return res
				.status(404)
				.json({ message: "Cannot pin more than once" });
		}

		await User.findOneAndUpdate(
			{ _id: currentUser._id },
			{ $push: { pins: suggestionId } }
		);
		await Suggestion.findOneAndUpdate(
			{ _id: suggestionId },
			{ $push: { pins: currentUser._id } }
		);
		return res.status(200).json({ message: "Pinned successfully" });
	} catch (err) {
		next(err);
	}
});

// Remove pin on a suggestion
router.delete("/:id/pin", requireUser, async (req, res, next) => {
	const currentUser = req.user;
	const suggestionId = req.params.id;
	try {
		if (!currentUser) {
			return res.status(404).json({ message: "Current user not found" });
		}
		await User.findOneAndUpdate(
			{ _id: currentUser._id },
			{ $pull: { pins: suggestionId } }
		);
		await Suggestion.findOneAndUpdate(
			{ _id: suggestionId },
			{ $pull: { pins: currentUser._id } }
		);
		return res.status(200).json({ message: "Unpinned successfully" });
	} catch (err) {
		next(err);
	}
});

module.exports = router;
