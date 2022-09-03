<template>
    <div class="row row-cols-1 row-cols-md-3 mb-3">
        <div class="col-md-9">
            <article class="blog-post">
                <h2 class="blog-post-title" >{{ blogDetails.title }}</h2>
                <p class="blog-post-meta">January 1, 2021 by <a href="#">{{ blogDetails.user_id }}</a> | <a href="#">{{ blogDetails.category_name }}</a></p>
                <p>{{ blogDetails.details }}</p>
            </article>
        </div>

        <div class="col-md-3 text-center">
            <blog-similler-cat v-for="simillerCat in simillerCats"
                v-bind:key="simillerCat.id"
                v-bind:id="simillerCat.id"
                v-bind:title="simillerCat.title"
                v-bind:image="simillerCat.image"
            ></blog-similler-cat>
        </div>
    </div>
</template>

<script>
    import BlogSimillerPost from './../../components/frontEnd/blogs/blogsSimillerCat.vue';

    export default {
        components: {
            'blog-similler-cat': BlogSimillerPost,
        },

        methods: {
            async loadSingleBlog(blogId){
                await this.$store.dispatch('Blogs/loadSingleBlog', {id: blogId});
            },
        },

        computed: {
            blogDetails(){
                return this.$store.getters['Blogs/blogDetails'];
            },

            simillerCats(){
                return this.$store.getters['Blogs/simillerBlogs'];
            }
        },

        created(){
            var blogId = this.$route.params.id;
            this.loadSingleBlog(blogId);
        }
    }
</script>