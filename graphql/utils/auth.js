const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { ObjectId } = require("mongodb");

module.exports.getUserId = (req, requireAuth = true) => {
	const header = req
		? req.headers.authorization
		: req.connection.context.Authorization;

	if (header) {
		const token = header.replace("Bearer ", "");
		const decoded = jwt.verify(token, "thisisasecret");
		return ObjectId(decoded.userId);
	}

	if (requireAuth) {
		throw new Error("Authentication required");
	}

	return null;
};

module.exports.generateToken = (userId) => {
	return jwt.sign({ userId }, "thisisasecret", { expiresIn: "7 days" });
};

module.exports.hashPassword = async (password) => {
	// encrypt password
	const salt = await bcrypt.genSaltSync(10);
	const hash = await bcrypt.hashSync(password, salt);
	return hash;
};

module.exports.comparePassword = async (password, hashedPassword) => {
	const isMatch = await bcrypt.compare(password, hashedPassword);

	if (!isMatch) {
		throw new Error("Unable to login");
	}
};
