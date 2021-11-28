const { getUserId } = require("../../utils/auth");
const { ObjectId } = require("mongodb");

module.exports = {
	async createArticle(parent, args, { db, req }, info) {
		const userId = getUserId(req);
		console.log(userId);
		const result = await db
			.collection("articles")
			.insertOne({ ...args.data, userId });

		return {
			message: "Article saved",
			_id: result.insertedId,
		};
	},
	async deleteArticle(parent, args, { db, req }, info) {
		const userId = getUserId(req);
		const result = await db.collection("articles").findOneAndDelete({
			_id: ObjectId(args._id),
			userId,
		});
		return article.value;
	},
	async updateArticle(parent, args, { db, req }, info) {
		const userId = getUserId(req);
		const result = await db
			.collection("articles")
			.findOneAndUpdate(
				{ _id: ObjectId(args._id), userId },
				{ $set: args.data },
				{ returnDocument: "after" }
			);
		return result.value;
	},
};
