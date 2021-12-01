module.exports = {
	async articles(parent, args, { db }, info) {
		return await db
			.collection("articles")
			.find({ userId: parent._id })
			.toArray();
	},
};
