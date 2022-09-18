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
                                <select class="form-select form-select-sm" v-model.trim="category_id" id="category_id" aria-label=".form-select-sm example">
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
                                <textarea class="form-control" v-model.trim="details" id="details" placeholder="Leave a comment here" style="height: 100px"></textarea>
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
                <div class="card-header">ALL Blog</div>
                <div class="card-body">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Blog Title</th>
                                <th scope="col">Blog Category</th>
                                <th scope="col">Create Date</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <blog-list v-for="loadBlog in loadBlogs" v-bind:key="loadBlog.id"
                            v-bind:id="loadBlog.id"
                            v-bind:title="loadBlog.title"
                            v-bind:created_at="loadBlog.created_at"
                            ></blog-list>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import BlogList from './../../components/backEnd/blog/blogList.vue';

    export default {
        components:{
            'blog-list': BlogList,
        },

        data(){
            return {
                category_id: '',
                title: '',
                details: '',
                formIsValid: true,
            }
        },

        methods: {
            async blogs(){
                await this.$store.dispatch('Blogs/loadBlogs');
            }
        },

        computed: {
            loadBlogs(){
                return this.$store.getters['Blogs/blogs'];
            },

            hasBlogs(){
                return this.$store.getters['Blogs/hasBlogs'];
            }
        },

        created() {
            this.blogs();
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