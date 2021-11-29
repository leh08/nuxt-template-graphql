<template>
    <div>
        <h1>Logging out</h1>
        <hr />

        <p>Please wait...</p>
    </div>
</template>

<script>
export default {
    async asyncData(context) {
        context.store.commit("isAuthenticated", false);
        await context.$apolloHelpers.onLogout();
        context.redirect("/");
    },
};
</script>
