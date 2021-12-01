export default {
	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		title: "livingspace",
		htmlAttrs: {
			lang: "en",
		},
		meta: [
			{ charset: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{ hid: "description", name: "description", content: "" },
			{ name: "format-detection", content: "telephone=no" },
		],
		link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: ["~/assets/bootstrap-5.1.3/css/bootstrap.min.css"],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [
		{
			src: "~/assets/bootstrap-5.1.3/js/bootstrap.min",
			mode: "client",
		},
	],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: ["@nuxtjs/axios", "@nuxtjs/apollo"],

	// Axios module configuration: https://go.nuxtjs.dev/config-axios
	axios: {},
	apollo: {
		clientConfigs: {
			default: "~/plugins/apollo-config.js",
		},
	},
	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {},
};
