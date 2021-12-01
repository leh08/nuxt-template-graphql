<template>
    <div>
        <h1>Logging out</h1>
        <hr />

        <p>Please wait...</p>
    </div>
</template>

<script>
import gql from "graphql-tag";

export default {
    async asyncData(context) {
        await context.app.apolloProvider.defaultClient.mutate({
            mutation: gql`
                mutation SetIsAuthenticated($value: Boolean!) {
                    setIsAuthenticated(value: $value) @client
                }
            `,
            variables: {
                value: false,
            },
        });
        await context.$apolloHelpers.onLogout();
        context.redirect("/");
    },
};
</script>
