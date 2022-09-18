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
                                <input id="cat_name" type="text" class="form-control form-control-sm" v-model.trim="cat_name" autocomplete="cat_name" autofocus placeholder="Enter Category Name">

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

        <table-loder class="col-md-10 card-table" v-if="isloading"></table-loder>

        <div class="col-md-10" v-else>
            <div v-if="hasCategory">
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

            <div v-else class="card-table">
                <no-data></no-data>
            </div>
        </div>
    </div>
</template>

<script>
    import CategoryList from './../../components/backEnd/category/categoryList.vue';
    import tableLoder from './../../components/ui/tableLoader.vue';

    export default {
        components:{
            'category-list': CategoryList,
            'table-loder': tableLoder,
        },

        data(){
            return {
                cat_name: '',
                formIsValid: true,
                isloading: true,
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
                await this.$store.dispatch('Category/addCategory', {
                    cat_name: this.cat_name,
                });
                this.cat_name = '';
                this.$swal.close();
            },

            async loadCategories(){
                await this.$store.dispatch('Category/loadCategories');
                this.isloading = false;
            }
        },

        computed: {
            categories(){
                return this.$store.getters['Category/categories'];
            },

            hasCategory(){
                return this.$store.getters['Category/hasCategory'];
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