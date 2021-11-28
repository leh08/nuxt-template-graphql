const { join } = require("path");
const { loadSchemaSync } = require("@graphql-tools/load");
const { GraphQLFileLoader } = require("@graphql-tools/graphql-file-loader");

module.exports = loadSchemaSync(join(__dirname, "./schema/*.gql"), {
	loaders: [new GraphQLFileLoader()],
});
