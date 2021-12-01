const { getUserId } = require("../../utils/auth");
const { ObjectId } = require("mongodb");

module.exports = {
	async articles(parent, args, { db }, info) {
		return await db.collection("articles").find({}).toArray();
	},
	async article(parent, args, { db, req }, info) {
		const userId = getUserId(req);
		const res = await db
			.collection("articles")
			.findOne({ _id: ObjectId(args._id), userId });
		if (!res) {
			throw new Error("Article not found");
		}
		return res;
	},
};
