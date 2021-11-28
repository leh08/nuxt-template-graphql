<template>
    <div>
        <h1>Login</h1>
        <hr />

        <div
            class="alert alert-success"
            v-if="$route.params.registered == 'yes'"
        >
            You have registered successfully
        </div>

        <div class="row">
            <div class="col-md-6">
                <form action="" method="post" @submit.prevent="submitForm()">
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

                    <div
                        class="alert alert-danger"
                        role="alert"
                        v-if="login_error"
                    >
                        {{ login_error }}
                    </div>

                    <input
                        type="submit"
                        value="Login"
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
export default {
    middleware: "auth",
    auth: "guest",
    data() {
        return {
            errors: null,
            login_error: null,
            email: null,
            password: null,
            status: false,
        };
    },

    methods: {
        submitForm() {
            this.$auth
                .loginWith("local", {
                    data: {
                        email: this.email,
                        password: this.password,
                    },
                })
                .catch((error) => {
                    console.log(error);
                    if (error.response.data.message) {
                        this.login_error = error.response.data.message;
                    }
                    if (error.response.data.errors) {
                        this.errors = error.response.data.errors;
                    }
                });
        },
    },
};
</script>
