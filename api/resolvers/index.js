const userQuery = require("./User/userQuery");
const userMutation = require("./User/userMutation");
const userNode = require("./User/userNode");

const articleQuery = require("./Article/articleQuery");
const articleMutation = require("./Article/articleMutation");
const articleNode = require("./Article/articleNode");

module.exports = {
	Query: {
		...userQuery,
		...articleQuery,
	},
	Mutation: {
		...userMutation,
		...articleMutation,
	},
	User: userNode,
	Article: articleNode,
};
