<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Sign Up <span v-if="!formIsValid" class="error-msg">Please Enter All Valid Data!!</span></div>
                    <div class="card-body">
                        <form @submit.prevent="submitRegistrationForm">
                            <div class="row mb-3">
                                <label for="name" class="col-md-4 col-form-label text-md-end">Name</label>

                                <div class="col-md-6">
                                    <input id="name" type="text" class="form-control" v-model.trim="name" autocomplete="name" autofocus>

                                    <span class="invalid-feedback" role="alert">
                                        <strong>Message</strong>
                                    </span>
                                </div>
                            </div>

                            <div class="row mb-3">
                                <label for="email" class="col-md-4 col-form-label text-md-end">E-Mail Address</label>

                                <div class="col-md-6">
                                    <input id="email" type="email" class="form-control" v-model.trim="email" autocomplete="email">

                                    <span class="invalid-feedback" role="alert">
                                        <strong>Message</strong>
                                    </span>
                                </div>
                            </div>

                            <div class="row mb-3">
                                <label for="password" class="col-md-4 col-form-label text-md-end">Password</label>

                                <div class="col-md-6">
                                    <input id="password" type="password" class="form-control" v-model.trim="password" autocomplete="new-password">

                                    <span class="invalid-feedback" role="alert">
                                        <strong>Message</strong>
                                    </span> 
                                </div>
                            </div>

                            <div class="row mb-0">
                                <div class="col-md-6 offset-md-4">
                                    <button type="submit" class="btn btn-primary">
                                        Register
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
                name: '',
                email: '',
                password: '',
                formIsValid: true,
            };
        }, 

        methods: {
            async submitRegistrationForm(){
                this.formIsValid = true;
                if (this.name == '' || this.email == '' || !this.email.includes('@') || this.password.length < 4) {
                    this.formIsValid = false;
                    return;
                }

                this.$swal.fire('Please Wait. Signup Processing.');
                this.$swal.showLoading();
                await this.$store.dispatch('Auth/registration', {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                })
                this.$swal.close();
                this.$router.replace('/dash');
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

