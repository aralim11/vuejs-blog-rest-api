<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <div class="card">
                <div class="card-header">Add Blog <span v-if="!formIsValid" class="error-msg">Please Enter Valid Blog Information!!</span></div>
                <div class="card-body">
                    <form @submit.prevent="submitBlogForm">
                        <div class="row mb-3">
                            <label for="category_id" class="col-md-4 col-form-label text-md-end">Category</label>
                            <div class="col-md-7">
                                <select class="form-select form-select-sm" v-model="category_id" id="category_id" aria-label=".form-select-sm example">
                                    <option value="">Select A Category</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                            </div>
                        </div>

                        <div class="row mb-3">
                            <label for="title" class="col-md-4 col-form-label text-md-end">Blog Title</label>
                            <div class="col-md-7">
                                <input id="title" type="text" class="form-control form-control-sm" v-model.trim="title" autocomplete="title" autofocus placeholder="Enter a title here">
                            </div>
                        </div>

                        <div class="row mb-3">
                            <label for="details" class="col-md-4 col-form-label text-md-end">Blog Details</label>
                            <div class="col-md-7">
                                <textarea class="form-control" v-model.trim="details" id="details" style="height: 100px"></textarea>
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
            <div v-if="hasBlogs">
                <div class="card card-table">
                    <div class="card-header">ALL Blog</div>
                    <div class="card-body">
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Blog Title</th>
                                    <th scope="col">Blog Category</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Create Date</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <blog-list v-for="loadBlog in loadBlogs" v-bind:key="loadBlog.id"
                                v-bind:id="loadBlog.id"
                                v-bind:title="loadBlog.title"
                                v-bind:category_id="loadBlog.category_id"
                                v-bind:status="loadBlog.status"
                                v-bind:created_at="loadBlog.created_at"
                                ></blog-list>
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
    import BlogList from './../../components/backEnd/blog/blogList.vue';
    import tableLoder from './../../components/ui/tableLoader.vue';

    export default {
        components:{
            'blog-list': BlogList,
            'table-loder': tableLoder,
        },

        data(){
            return {
                category_id: '',
                title: '',
                details: '',
                formIsValid: true,
                isloading: true,
            }
        },

        methods: {
            async submitBlogForm(){
                this.formIsValid = true;
                if (this.category_id  == '' && this.title == '' && this.details == '') {
                    this.formIsValid = false;
                    return;
                }

                this.$swal.fire('Please Wait. Processing...');
                this.$swal.showLoading();
                await this.$store.dispatch('userBlogs/addUserBlog', {
                    category_id: this.category_id,
                    title: this.title,
                    details: this.details,
                });
                this.category_id = '';
                this.title = '';
                this.details = '';
                this.$swal.close();
            },

            async loadUserBlogs(){
                await this.$store.dispatch('userBlogs/loadUserBlogs');
                this.isloading = false;
            }
        },

        computed: {
            loadBlogs(){
                return this.$store.getters['userBlogs/userBlogs'];
            },

            hasBlogs(){
                return this.$store.getters['userBlogs/hasBlogs'];
            }
        },

        created() {
            this.loadUserBlogs();
        },
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