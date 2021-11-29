export const state = () => ({
	isAuthenticated: false,
});

export const mutations = {
	setIsAuthenticated(state, value) {
		state.isAuthenticated = value;
	},
};
