<template>
    <div class="row row-cols-1 row-cols-md-3 mb-3">
        <div class="col-md-9">
            <blog-detail-loader v-if="isloadingBlog"/>

            <article class="blog-post" v-else>
                <h2 class="blog-post-title" >{{ blogDetails.title }}</h2>
                <p class="blog-post-meta">{{ blogDetails.created_at }} by <a href="#">{{ blogDetails.user_id }}</a> | <a href="#">{{ blogDetails.category_name }}</a></p>
                <p>{{ blogDetails.details }}</p>
            </article>
        </div>

        <div class="col-md-3 text-center">
            <similler-blog-loader v-if="isloadingBlog"/>

            <blog-similler-cat v-else v-for="simillerCat in simillerCats"
                v-bind:key="simillerCat.id"
                v-bind:id="simillerCat.id"
                v-bind:title="simillerCat.title"
                v-bind:image="simillerCat.image"
                v-bind:created_at="simillerCat.created_at"
            ></blog-similler-cat>
        </div>
    </div>
</template>

<script>
    import BlogSimillerPost from './../../components/frontEnd/blogs/blogsSimillerCat.vue';
    import blogDetailLoader from './../../components/ui/blogDetailLoader.vue';
    import simillerBlogLoader from './../../components/ui/simillerBlogLoader.vue';

    export default {
        data(){
            return{
                isloadingBlog: true,
            }
        },

        components: {
            'blog-similler-cat': BlogSimillerPost,
            'blog-detail-loader': blogDetailLoader,
            'similler-blog-loader': simillerBlogLoader,
        },

        methods: {
            async loadSingleBlog(blogId){
                this.$swal.fire('Please Wait. Data Loading.');
                this.$swal.showLoading();
                await this.$store.dispatch('Blogs/loadSingleBlog', {id: blogId});
                this.isloadingBlog = false;
                this.$swal.close();
            },
        },

        computed: {
            blogDetails(){
                return this.$store.getters['Blogs/blogDetails'];
            },

            simillerCats(){
                return this.$store.getters['Blogs/simillerBlogs'];
            },
        },

        created(){
            var blogId = this.$route.params.id;
            this.loadSingleBlog(blogId);
        }
    }
</script>