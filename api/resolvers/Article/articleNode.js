module.exports = {
	async user(parent, args, { db }, info) {
		return await db.collection("users").findOne({ _id: parent.userId });
	},
};
