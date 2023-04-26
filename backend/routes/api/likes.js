const express = require("express");
const router = express.Router();
const { requireUser } = require("../../config/passport");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Suggestion = mongoose.model("Suggestion");

// Like a suggestion
router.post("/:id/like", requireUser, async (req, res, next) => {
	const currentUser = req.user;
	const suggestionId = req.params.id;
	try {
		// return res.status(400).json({message: `${suggestionId}`})
		if (!currentUser) {
			return res.status(404).json({ message: "Current user not found" });
		}
		// Check if user has already liked the suggestion
		if (currentUser.likes.includes(suggestionId)) {
			// Remove the dislike
			return res
				.status(404)
				.json({ message: "Cannot like more than once" });
		}

		// Check if the user has already disliked the suggestion
		if (currentUser.dislikes.includes(suggestionId)) {
			// Remove the dislike
			await User.findByIdAndUpdate(currentUser._id, {
				$pull: { dislikes: suggestionId },
			});
			await Suggestion.findByIdAndUpdate(suggestionId, {
				$pull: { dislikes: currentUser._id },
			});
		}

		await User.findOneAndUpdate(
			{ _id: currentUser._id },
			{ $push: { likes: suggestionId } }
		);
		await Suggestion.findOneAndUpdate(
			{ _id: suggestionId },
			{ $push: { likes: currentUser._id } }
		);
		return res.status(200).json({ message: "Liked successfully" });
	} catch (err) {
		next(err);
	}
});

// Dislike a suggestion
router.post("/:id/dislike", requireUser, async (req, res, next) => {
	const currentUser = req.user;
	const suggestionId = req.params.id;
	try {
		// return res.status(400).json({message: `${suggestionId}`})
		if (!currentUser) {
			return res.status(404).json({ message: "Current user not found" });
		}
		// Check if user has already disliked the suggestion
		if (currentUser.dislikes.includes(suggestionId)) {
			// Remove the dislike
			return res
				.status(404)
				.json({ message: "Cannot dislike more than once" });
		}

		// Check if the user has already liked the suggestion
		if (currentUser.likes.includes(suggestionId)) {
			// Remove the dislike
			await User.findByIdAndUpdate(currentUser._id, {
				$pull: { likes: suggestionId },
			});
			await Suggestion.findByIdAndUpdate(suggestionId, {
				$pull: { likes: currentUser._id },
			});
		}

		await User.findOneAndUpdate(
			{ _id: currentUser._id },
			{ $push: { dislikes: suggestionId } }
		);
		await Suggestion.findOneAndUpdate(
			{ _id: suggestionId },
			{ $push: { dislikes: currentUser._id } }
		);
		return res.status(200).json({ message: "Disliked successfully" });
	} catch (err) {
		next(err);
	}
});

// Remove like on a suggestion
router.delete("/:id/like", requireUser, async (req, res, next) => {
	const currentUser = req.user;
	const suggestionId = req.params.id;
	try {
		if (!currentUser) {
			return res.status(404).json({ message: "Current user not found" });
		}
		await User.findOneAndUpdate(
			{ _id: currentUser._id },
			{ $pull: { likes: suggestionId } }
		);
		await Suggestion.findOneAndUpdate(
			{ _id: suggestionId },
			{ $pull: { likes: currentUser._id } }
		);
		return res.status(200).json({ message: "Unliked successfully" });
	} catch (err) {
		next(err);
	}
});

// Remove dislike on a suggestion
router.delete("/:id/dislike", requireUser, async (req, res, next) => {
	const currentUser = req.user;
	const suggestionId = req.params.id;
	try {
		if (!currentUser) {
			return res.status(404).json({ message: "Current user not found" });
		}
		await User.findOneAndUpdate(
			{ _id: currentUser._id },
			{ $pull: { dislikes: suggestionId } }
		);
		await Suggestion.findOneAndUpdate(
			{ _id: suggestionId },
			{ $pull: { dislikes: currentUser._id } }
		);
		return res.status(200).json({ message: "Undisliked successfully" });
	} catch (err) {
		next(err);
	}
});

module.exports = router;
