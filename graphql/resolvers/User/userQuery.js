const { getUserId } = require("../../utils/auth");

module.exports = {
	async me(parent, args, { db, req }, info) {
		const userId = getUserId(req);
		return await db.collection("users").findOne({ _id: userId });
	},
	async users(parent, args, { db }, info) {
		if (!args.query) {
			return await db.collection("users").find({}).toArray();
		}
		return await db
			.collection("users")
			.find({ name: args.query })
			.toArray();
	},
};
