const {
	getUserId,
	hashPassword,
	generateToken,
	comparePassword,
} = require("../../utils/auth");

module.exports = {
	async createUser(parent, args, { db }, info) {
		const user = await db
			.collection("users")
			.findOne({ email: args.data.email });
		if (user !== null) {
			throw new Error("Email already in use");
		}
		args.data.password = await hashPassword(args.data.password);
		const result = await db
			.collection("users")
			.insertOne({ ...args.data, tokens: [] });

		return {
			message: "User saved",
			_id: result.insertedId,
		};
	},
	async loginUser(parent, args, { db }, info) {
		const user = await db
			.collection("users")
			.findOne({ email: args.data.email });

		if (!user) {
			throw new Error("Unable to login");
		}

		comparePassword(args.data.password, user.password);

		const token = generateToken(user._id);
		const result = await db
			.collection("users")
			.findOneAndUpdate(
				{ _id: user._id },
				{ $set: { tokens: user.tokens.concat({ token }) } }
			);
		return {
			user,
			token,
		};
	},
	async updateUser(parent, args, { db }, info) {
		const userId = getUserId(request);
		data.password = await hashPassword(data.password);
		const result = await db
			.collection("users")
			.findOneAndUpdate({ _id: userId }, { $set: args.data });
		if (!result.lastErrorObject.updatedExisting) {
			throw new Error("User not found");
		}
		return {
			message: "User updated",
		};
	},
};
