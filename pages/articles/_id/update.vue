<template>
    <div>
        <h1>Update Article</h1>
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
                        class="btn btn-primary mr-3"
                    />
                    <nuxt-link
                        :to="'/articles/' + $route.params.id"
                        class="btn btn-secondary mr-3"
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
    apollo: {
        article: {
            query: gql`
                query Article($articleId: ID!) {
                    article(_id: $articleId) {
                        _id
                        title
                        body
                        user {
                            fullName
                        }
                    }
                }
            `,
            variables() {
                return {
                    articleId: this.$route.params.id,
                };
            },
        },
    },

    data() {
        return {
            errors: null,
            title: null,
            body: null,
        };
    },

    mounted() {
        this.fillFormData();
    },

    methods: {
        fillFormData() {
            this.title = this.article.title;
            this.body = this.article.body;
        },

        async submitForm() {
            const response = await this.$apollo.mutate({
                mutation: gql`
                    mutation UpdateArticle(
                        $id: ID!
                        $data: UpdateArticleInput!
                    ) {
                        updateArticle(_id: $id, data: $data) {
                            _id
                            title
                            body
                            user {
                                fullName
                            }
                        }
                    }
                `,
                variables: {
                    id: this.$route.params.id,
                    data: {
                        title: this.title,
                        body: this.body,
                    },
                },
            });

            if (response.data.updateArticle._id) {
                this.$router.push({
                    name: "articles-id",
                    params: {
                        updated: "yes",
                        id: this.$route.params.id,
                    },
                });
            }
        },
    },
};
</script>
