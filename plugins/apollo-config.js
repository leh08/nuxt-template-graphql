import gql from "graphql-tag";

export default function (context) {
	return {
		httpEndpoint: "http://localhost:4000",
		typeDefs: gql`
			type Query {
				isAuthenticated: Boolean!
			}
		`,
		resolvers: {
			Mutation: {
				setIsAuthenticated: (root, { value }, { cache }) => {
					const data = {
						isAuthenticated: value,
					};
					cache.writeData({ data });
				},
			},
		},
		onCacheInit: (cache) => {
			const data = {
				isAuthenticated: false,
			};
			cache.writeData({ data });
		},
	};
}
