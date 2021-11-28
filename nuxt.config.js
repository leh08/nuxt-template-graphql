export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "livingspace",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/node_modules/bootstrap/dist/css/bootstrap.min.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {
      src: "~/node_modules/bootstrap/dist/js/bootstrap.min",
      mode: "client",
    },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/axios", "@nuxtjs/auth"],

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: "/api/users/login",
            method: "post",
            propertyName: "token",
          },
          logout: {
            url: "/api/users/logout",
            method: "delete",
          },
          user: {
            url: "/api/users/me",
            method: "get",
            propertyName: "user",
          },
        },
        tokenRequired: true,
        tokenType: "Bearer",
      },
    },
    redirect: {
      login: "/user/login", // User will be redirected to this path if login is required
      logout: "/", // User will be redirected to this path if after logout, current route is protected
      home: "/", // User will be redirect to this path after login if accessed login page directly
    },
    rewriteRedirects: true,
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  serverMiddleware: ["~/api"],
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
