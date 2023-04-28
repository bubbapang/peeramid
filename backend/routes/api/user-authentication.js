const express = require("express");
const router = express.Router();
// Other required imports
const bcrypt = require("bcryptjs");
const passport = require("passport");

const mongoose = require("mongoose");

const User = mongoose.model("User");

const { loginUser } = require("../../config/passport");

const validateRegisterInput = require("../../validations/register");
const validateLoginInput = require("../../validations/login");

// Route handlers for registration, login, and logout
router.post("/register", validateRegisterInput, async (req, res, next) => {
	// Check to make sure no one has already registered with the proposed email or
	// username.
	const user = await User.findOne({
		$or: [{ email: req.body.email }, { username: req.body.username }],
	});

	if (user) {
		// Throw a 400 error if the email address and/or email already exists
		const err = new Error("Validation Error");
		err.statusCode = 400;
		const errors = {};
		if (user.email === req.body.email) {
			errors.email = "A user has already registered with this email";
		}
		if (user.username === req.body.username) {
			errors.username =
				"A user has already registered with this username";
		}
		if (user.firstName === req.body.firstName) {
			errors.firstName = "firstName must be between 2 and 30 characters";
		}
		if (user.lastName === req.body.lastName) {
			errors.lastName = "lastName must be between 2 and 30 characters";
		}

		err.errors = errors;
		return next(err);
	}

	// Otherwise create a new user
	const newUser = new User({
		username: req.body.username,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		public: req.body.public,
		following: req.body.following,
		followers: req.body.followers,
		followRequest: req.body.followRequest,
	});

	bcrypt.genSalt(10, (err, salt) => {
		if (err) throw err;
		bcrypt.hash(req.body.password, salt, async (err, hashedPassword) => {
			if (err) throw err;
			try {
				newUser.hashedPassword = hashedPassword;
				const user = await newUser.save();
				return res.json(await loginUser(user));
			} catch (err) {
				next(err);
			}
		});
	});
});

router.post("/login", validateLoginInput, async (req, res, next) => {
	passport.authenticate("local", async function (err, user) {
		if (err) return next(err);
		if (!user) {
			const err = new Error("Invalid credentials");
			err.statusCode = 400;
			err.errors = { email: "Invalid credentials" };
			return next(err);
		}
		return res.json(await loginUser(user));
	})(req, res, next);
});

router.delete("/logout", (req, res) => {
	req.logout(() => {
		res.json({ message: "You have successfully logged out" });
	});
});

module.exports = router;
