<template>
    <div>
        <nav
            class="navbar navbar-expand-md navbar-light bg-light border-bottom"
        >
            <div class="container">
                <nuxt-link to="/" class="navbar-brand">Express CRUD</nuxt-link>
                <button
                    class="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarsCollapse"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarsCollapse">
                    <ul class="navbar-nav me-auto">
                        <li class="nav-item">
                            <nuxt-link
                                to="/"
                                class="nav-link"
                                exact-active-class="active"
                                >Home</nuxt-link
                            >
                        </li>
                        <li class="nav-item">
                            <nuxt-link
                                to="/articles"
                                class="nav-link"
                                exact-active-class="active"
                                >Articles</nuxt-link
                            >
                        </li>
                    </ul>

                    <ul class="navbar-nav" v-if="!hasToken">
                        <li class="nav-item">
                            <nuxt-link
                                to="/user/register"
                                class="nav-link"
                                exact-active-class="active"
                                >Register</nuxt-link
                            >
                        </li>
                        <li class="nav-item">
                            <nuxt-link
                                to="/user/login"
                                class="nav-link"
                                exact-active-class="active"
                                >Login</nuxt-link
                            >
                        </li>
                    </ul>

                    <ul class="navbar-nav" v-if="hasToken">
                        <li class="nav-item">
                            <nuxt-link
                                to="/user/my-account"
                                class="nav-link"
                                exact-active-class="active"
                                >My Account</nuxt-link
                            >
                        </li>
                        <li class="nav-item">
                            <nuxt-link
                                to="/user/logout"
                                class="nav-link"
                                exact-active-class="active"
                                >Logout</nuxt-link
                            >
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

        <div class="container mt-4">
            <nuxt />
        </div>
    </div>
</template>
<script>
export default {
    computed: {
        hasToken() {
            return this.$store.state.isAuthenticated;
        },
    },
    mounted() {
        if (!!this.$apolloHelpers.getToken()) {
            this.$store.commit("setIsLoggedIn", true);
        }
    },
};
</script>



