<template>
    <div>
        <h1>Add New Article</h1>
        <hr />

        <div class="row">
            <div class="col-md-6">
                <form action="" method="post" @submit.prevent="submitForm()">
                    <div class="form-group mb-2">
                        <label for="">Title</label>
                        <input
                            type="text"
                            class="form-control"
                            :class="{ 'is-invalid': errors && errors.title }"
                            v-model="title"
                        />
                        <div
                            class="invalid-feedback"
                            v-if="errors && errors.title"
                        >
                            {{ errors.title.msg }}
                        </div>
                    </div>
                    <div class="form-group mb-2">
                        <label for="">Body</label>
                        <textarea
                            cols="30"
                            rows="4"
                            class="form-control"
                            :class="{ 'is-invalid': errors && errors.body }"
                            v-model="body"
                        ></textarea>
                        <div
                            class="invalid-feedback"
                            v-if="errors && errors.body"
                        >
                            {{ errors.body.msg }}
                        </div>
                    </div>

                    <input
                        type="submit"
                        value="Submit"
                        class="btn btn-primary mt-2 me-3"
                    />
                    <nuxt-link
                        to="/articles"
                        class="btn btn-secondary mt-2 me-3"
                        >Cancel</nuxt-link
                    >
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { gql } from "graphql-tag";
import ARTICLES_QUERY from "~/graphql/articles";
export default {
    data() {
        return {
            errors: null,
            title: null,
            body: null,
        };
    },

    methods: {
        async submitForm() {
            const data = {
                title: this.title,
                body: this.body,
            };
            const response = await this.$apollo.mutate({
                mutation: gql`
                    mutation CreateArticle($data: CreateArticleInput!) {
                        createArticle(data: $data) {
                            message
                            _id
                        }
                    }
                `,
                variables: {
                    data,
                },
                update: (store, { data: { createArticle } }) => {
                    const { articles } = store.readQuery({
                        query: ARTICLES_QUERY,
                    });

                    articles.push({
                        _id: createArticle._id,
                        ...data,
                    });

                    store.writeQuery({
                        query: ARTICLES_QUERY,
                        data: { articles },
                    });
                },
            });
            if (response.data.createArticle._id) {
                this.$router.push({
                    name: "articles",
                    params: { created: "yes" },
                });
            }
        },
    },
};
</script>
