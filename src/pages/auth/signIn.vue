<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Sign In <span v-if="!formIsValid" class="error-msg">Please Enter Valid Email and Password!!</span></div>
                    <div class="card-body">
                        <form @submit.prevent="submitForm">
                            <div class="row mb-3">
                                <label for="email" class="col-md-4 col-form-label text-md-end">E-Mail Address</label>
                                <div class="col-md-6">
                                    <input id="email" type="email" class="form-control" v-model.trim="email" autocomplete="email" autofocus>

                                    <span class="invalid-feedback" role="alert">
                                        <strong>Message</strong>
                                    </span>
                                </div>
                            </div>

                            <div class="row mb-3">
                                <label for="password" class="col-md-4 col-form-label text-md-end">Password</label>
                                <div class="col-md-6">
                                    <input id="password" type="password" class="form-control" v-model.trim="password" autocomplete="current-password">

                                    <span class="invalid-feedback" role="alert">
                                        <strong>Message</strong>
                                    </span>
                                </div>
                            </div>

                            <div class="row mb-3">
                                <div class="col-md-6 offset-md-4">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" name="remember" id="remember">

                                        <label class="form-check-label" for="remember">
                                            Remember Me
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div class="row mb-0">
                                <div class="col-md-8 offset-md-4">
                                    <button type="submit" class="btn btn-primary">
                                        Login
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    export default {
        data() {
            return {
                email: '',
                password: '',
                formIsValid: true,
            };
        },

        methods: {
            submitForm(){
                this.formIsValid = true;
                if (this.email == '' || !this.email.includes('@') || this.password.length < 4) {
                    this.formIsValid = false;
                    return;
                }
            }
        }
    }
</script>

<style scoped>
    .error-msg{
        float: right;
        color: red;
        font-family: cursive;
    }
</style>