const express = require("express");
const router = express.Router();
// Other required imports
const { restoreUser } = require("../../config/passport");

const mongoose = require("mongoose");

const User = mongoose.model("User");

// Route handlers for user following, follow requests, and follow approval
// FOR PRIVATE USERS, ACCEPTS THE FOLLOW REQUEST
router.post("/approve/:id", restoreUser, async (req, res, next) => {
	const requesterUser = await User.findById(req.params.id); //user who sent request
	const currentUser = req.user; //user approving request

	try {
		if (!requesterUser) {
			return res.status(404).json({ message: "User not found" });
		}
		if (!currentUser) {
			return res.status(404).json({ message: "Current user not found" });
		}
		if (!currentUser.followRequest.includes(requesterUser._id)) {
			return res.status(400).json({ message: `No request to approve` });
		}
		// currentUser is approving
		await User.findByIdAndUpdate(currentUser._id, {
			$push: { followers: requesterUser._id },
			$pull: { followRequest: requesterUser._id },
		});

		// requesterUser is requesting to follow
		await User.findByIdAndUpdate(requesterUser._id, {
			$push: { following: currentUser._id },
		});
		return res.status(200).json({ message: "Follow request approved" });
	} catch (err) {
		return next(err);
	}
});

// FOR PRIVATE USERS, DELETES THE FOLLOW REQUEST
router.delete("/delete/:id", restoreUser, async (req, res, next) => {
	const requesterUser = await User.findById(req.params.id);
	const currentUser = req.user;
	try {
		if (!requesterUser) {
			return res.status(404).json({ message: "User not found" });
		}
		if (!currentUser) {
			return res.status(404).json({ message: "Current user not found" });
		}
		if (!currentUser.followRequest.includes(requesterUser._id)) {
			return res.status(400).json({ message: `No request to approve` });
		}
		// currentUser is approving
		await User.findByIdAndUpdate(currentUser._id, {
			$pull: { followRequest: requesterUser._id },
		});

		return res.status(200).json({ message: "Follow request deleted" });
	} catch (err) {
		return next(err);
	}
});

////////////////////////////////////////////////////////////////////////////////////////

// CREATES A FOLLOWING FOR PUBLIC AND SENDS A REQ IF THE USER RECEIVING THE REQUEST IS PRIVATE
router.post("/:id/follow", restoreUser, async (req, res, next) => {
	const targetUser = await User.findById(req.params.id);
	const currentUser = req.user;

	try {
		if (!targetUser) {
			return res.status(404).json({ message: "User not found" });
		}
		if (!currentUser) {
			return res.status(404).json({ message: "Current user not found" });
		}
		if (currentUser._id === targetUser._id) {
			return res.status(404).json({ message: "Cannot follow self" });
		}
		if (currentUser.following.includes(req.params.id)) {
			return res
				.status(400)
				.json({ message: `Already following this user` });
		}
		if (targetUser.followRequest.includes(currentUser._id)) {
			return res
				.status(400)
				.json({ message: `Already sent follow request` });
		}
		if (targetUser.public) {
			await User.findOneAndUpdate(
				{ _id: currentUser._id },
				{ $push: { following: targetUser._id } }
			);
			await User.findOneAndUpdate(
				{ _id: targetUser._id },
				{ $push: { followers: currentUser._id } }
			);
			return res
				.status(200)
				.json({ message: "User followed successfully" }); // Add this line;
		} else {
			await User.findOneAndUpdate(
				{ _id: targetUser._id },
				{ $push: { followRequest: currentUser._id } }
			);
			return res.status(200).json({ message: "Follow request sent" }); // Add this line
		}
	} catch (err) {
		return next(err);
	}
});

// DELETE USER FROM FOLLOWING AND FOLLOW REQUEST
router.delete("/:id/follow", restoreUser, async (req, res, next) => {
	const targetUser = await User.findById(req.params.id);
	const currentUser = req.user;

	try {
		if (!targetUser) {
			return res.status(404).json({ message: "User not found" });
		}
		if (!currentUser) {
			return res.status(404).json({ message: "Current user not found" });
		}
		if (currentUser._id === targetUser._id) {
			return res.status(404).json({ message: "Cannot unfollow self" });
		}
		if (
			!currentUser.following.includes(req.params.id) &&
			!targetUser.followRequest.includes(currentUser._id)
		) {
			return res
				.status(400)
				.json({ message: `Follow request never sent to this user` });
		}

		await User.findOneAndUpdate(
			{ _id: currentUser._id },
			{ $pull: { following: targetUser._id } }
		);
		await User.findOneAndUpdate(
			{ _id: targetUser._id },
			{ $pull: { followers: currentUser._id } }
		);
		await User.findOneAndUpdate(
			{ _id: targetUser._id },
			{ $pull: { followRequest: currentUser._id } }
		);
		return res.status(200).json({ message: "Follow deleted" }); // Add this line
	} catch (err) {
		return next(err);
	}
});

module.exports = router;
