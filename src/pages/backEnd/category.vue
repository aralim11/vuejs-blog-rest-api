<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <div class="card">
                <div class="card-header">Add Category <span v-if="!formIsValid" class="error-msg">Please Enter Valid Category!!</span></div>
                <div class="card-body">
                    <form @submit.prevent="submitCategoryForm">
                        <div class="row mb-3">
                            <label for="cat_name" class="col-md-4 col-form-label text-md-end">Category</label>
                            <div class="col-md-7">
                                <input id="cat_name" type="text" class="form-control form-control-sm" v-model.trim="cat_name" autocomplete="cat_name" autofocus>

                                <span class="invalid-feedback" role="alert">
                                    <strong>Message</strong>
                                </span>
                            </div>
                        </div>

                        <div class="row mb-0">
                            <div class="col-md-8 offset-md-4">
                                <button type="submit" class="btn btn-primary">
                                    Save
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>


        <div class="col-md-10">
            <div class="card card-table">
                <div class="card-header">ALL Category</div>
                <div class="card-body">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Category Name</th>
                                <th scope="col">Create Date</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <category-list v-for="categorie in categories" :key="categorie.id"
                                v-bind:id="categorie.id"
                                v-bind:cat_name="categorie.cat_name"
                                v-bind:created_at="categorie.created_at"
                            ></category-list>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import CategoryList from './../../components/backEnd/category/categoryList.vue';

    export default {
        components:{
            'category-list': CategoryList,
        },

        data(){
            return {
                cat_name: '',
                formIsValid: true,
            }
        },

        methods: {
            async submitCategoryForm(){
                this.formIsValid = true;
                if (this.cat_name  == '') {
                    this.formIsValid = false;
                    return;
                }

                this.$swal.fire('Please Wait. Processing...');
                this.$swal.showLoading();
                await this.$store.dispatch('Blogs/addCategory', {
                    cat_name: this.cat_name,
                });
                this.cat_name = '';
                this.$swal.close();
            },

            async loadCategories(){
                await this.$store.dispatch('Blogs/loadCategories');
            }
        },

        computed: {
            categories(){
                return this.$store.getters['Blogs/categories'];
            }
        },

        created(){
            this.loadCategories();
        }
    }
</script>

<style scoped>
    .error-msg{
        float: right;
        color: red;
        font-family: cursive;
    }

    .card-table {
        margin-top: 10px;
    }
</style>