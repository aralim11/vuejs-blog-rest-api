<template>
    <div class="row row-cols-1 row-cols-md-3 mb-3">
        <div class="col-md-9">
            <article class="blog-post">
                <h2 class="blog-post-title" >{{ blogDetails.title }}</h2>
                <p class="blog-post-meta">{{ format_date(blogDetails.created_at) }} by <a href="#">{{ blogDetails.user_id }}</a> | <a href="#">{{ blogDetails.category_name }}</a></p>
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
    import moment from 'moment';

    export default {
        components: {
            'blog-similler-cat': BlogSimillerPost,
        },

        methods: {
            async loadSingleBlog(blogId){
                this.$swal.fire('Please Wait. Data Loading.');
                this.$swal.showLoading();
                await this.$store.dispatch('Blogs/loadSingleBlog', {id: blogId});
                this.$swal.close();
            },

            format_date(date){
                return moment(date).format('MMMM MM, YYYY');
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