<template>
    <div>
        <h1>Register</h1>
        <hr />
        <div class="alert alert-success" v-if="registered">
            You have registered successfully
        </div>
        <div class="row">
            <div class="col-md-6">
                <form action="" method="post" @submit.prevent="onSubmit()">
                    <div class="form-group mb-2">
                        <label class="form-label" for="inputFullName"
                            >Full Name</label
                        >
                        <input
                            type="text"
                            class="form-control"
                            id="inputFullName"
                            :class="{
                                'is-invalid': errors && errors.fullName,
                            }"
                            v-model="fullName"
                        />
                        <div
                            class="invalid-feedback"
                            v-if="errors && errors.fullName"
                        >
                            {{ errors.fullName.msg }}
                        </div>
                    </div>

                    <div class="form-group mb-2">
                        <label class="form-label" for="inputEmail">Email</label>
                        <input
                            type="text"
                            class="form-control"
                            id="inputEmail"
                            :class="{ 'is-invalid': errors && errors.email }"
                            v-model="email"
                        />
                        <div
                            class="invalid-feedback"
                            v-if="errors && errors.email"
                        >
                            {{ errors.email.msg }}
                        </div>
                    </div>

                    <div class="form-group mb-2">
                        <label class="form-label" for="inputPassword"
                            >Password</label
                        >
                        <input
                            type="password"
                            class="form-control"
                            id="inputPassword"
                            :class="{ 'is-invalid': errors && errors.password }"
                            v-model="password"
                        />
                        <div
                            class="invalid-feedback"
                            v-if="errors && errors.password"
                        >
                            {{ errors.password.msg }}
                        </div>
                    </div>

                    <input
                        type="submit"
                        value="Register"
                        class="btn btn-primary mt-2 me-3"
                    />
                    <nuxt-link to="/" class="btn btn-secondary mt-2 me-3"
                        >Cancel</nuxt-link
                    >
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import gql from "graphql-tag";

export default {
    data() {
        return {
            errors: null,
            fullName: null,
            email: null,
            password: null,
            status: false,
            registered: false,
        };
    },

    methods: {
        async onSubmit() {
            try {
                let response = await this.$apollo.mutate({
                    mutation: gql`
                        mutation CreateUser($data: CreateUserInput!) {
                            createUser(data: $data) {
                                message
                                _id
                            }
                        }
                    `,
                    variables: {
                        data: {
                            fullName: this.fullName,
                            email: this.email,
                            password: this.password,
                        },
                    },
                });
                if (response.data.createUser._id) {
                    this.registered = true;
                    // log in if successfully registered
                    response = await this.$apollo.mutate({
                        mutation: gql`
                            mutation LoginUser($data: LoginUserInput!) {
                                loginUser(data: $data) {
                                    token
                                    user {
                                        _id
                                        fullName
                                        email
                                    }
                                }
                            }
                        `,
                        variables: {
                            data: {
                                email: this.email,
                                password: this.password,
                            },
                        },
                    });
                    const token = response.data.loginUser.token;
                    this.$store.commit("isAuthenticated", true);
                    await this.$apolloHelpers.onLogin(token);
                    this.$router.push("/");
                }
            } catch (e) {
                console.error(e);
            }
        },
    },
};
</script>
