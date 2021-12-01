<template>
    <div v-if="article">
        <h1>Article Details</h1>

        <hr />

        <div class="alert alert-success" v-if="$route.params.updated == 'yes'">
            Record updated successfully
        </div>

        <h2>{{ article.title }}</h2>

        <h6>By {{ article.user.fullName }}</h6>

        <p>{{ article.body }}</p>

        <hr />
        <div class="d-flex justify-content-between">
            <div>
                <nuxt-link
                    :to="'/articles/' + article._id + '/update'"
                    class="btn btn-primary mr-3"
                    >Update</nuxt-link
                >
                <button class="btn btn-danger" @click="deleteRecord()">
                    Delete
                </button>
            </div>
            <nuxt-link to="/articles" class="btn btn-secondary mr-3"
                >Back to Articles</nuxt-link
            >
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

    methods: {
        async deleteRecord() {
            if (confirm("Are you sure?") === true) {
                const response = await this.$apollo.mutate({
                    mutation: gql`
                        mutation Mutation($id: ID!) {
                            deleteArticle(_id: $id) {
                                _id
                            }
                        }
                    `,
                    variables: { id: this.$route.params.id },
                    update: (store, { data: { deleteArticle } }) => {
                        const { articles } = store.readQuery({
                            query: ARTICLES_QUERY,
                        });

                        store.writeQuery({
                            query: ARTICLES_QUERY,
                            data: {
                                articles: articles.filter(
                                    (article) =>
                                        article._id !== deleteArticle._id
                                ),
                            },
                        });
                    },
                });

                if (response.data.deleteArticle._id) {
                    this.$router.push({
                        name: "articles",
                        params: { deleted: "yes" },
                    });
                }
            }
        },
    },
};
</script>
