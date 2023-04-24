const multer = require("multer");
const sharp = require("sharp");
const path = require("path");

const storage = multer.memoryStorage();
const upload = multer({ storage });

const uploadProfileImage = async (req, res, next) => {
	if (!req.file) {    
		return next();
	}

	const filename = `profile-${req.user._id}-${Date.now()}.jpeg`;
	const filepath = path.join(__dirname, "uploads", filename);

	await sharp(req.file.buffer)
		.resize(200, 200)
		.jpeg({ quality: 90 })
		.toFile(filepath);

	req.file.filename = filename;
	next();
};

module.exports = { upload, uploadProfileImage };
