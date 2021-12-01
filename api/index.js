const { ApolloServer } = require("apollo-server");
const db = require("./db");

const typeDefs = require("./typeDefs");

const resolvers = require("./resolvers");

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req }) => {
		return {
			req,
			db,
		};
	},
});

server.listen().then(({ url }) => {
	console.log(`🚀  Server ready at ${url}`);
});
