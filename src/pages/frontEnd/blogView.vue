<template>
    <div class="row row-cols-1 row-cols-md-3 mb-3">
        <div class="col-md-9">
            <article class="blog-post">
                <h2 class="blog-post-title" >ok</h2>
   <!--              <p class="blog-post-meta">January 1, 2021 by <a href="#">{{ user }}</a> | <a href="#">{{ category }}</a></p>
                <p>{{ details }}</p> -->
            </article>
        </div>
<!-- 
        <div class="col-md-3 text-center">
            <blog-similler-cat v-for="simillerCat in simillerCats"
                v-bind:key="simillerCat.id"
                v-bind:id="simillerCat.id"
                v-bind:title="simillerCat.title"
                v-bind:image="simillerCat.image"
            ></blog-similler-cat>
        </div> -->
    </div>
</template>

<script>
   // import BlogSimillerPost from './../../components/frontEnd/blogs/blogsSimillerCat.vue';

    export default {
/*         components: {
            'blog-similler-cat' : BlogSimillerPost,
        }, */

        data(){
            return {
                blogDetails: null,
                blogId: null,
            }
        },

        methods: {
            async loadSingleBlog(){
                await this.$store.dispatch('Blogs/loadSingleBlog', {id: this.blogId});
            }
        },

        computed: {
            
            // title(){
            //     return this.blogDetails.title;
            // },

            // details(){
            //     return this.blogDetails.details;
            // },

            // user(){
            //     return this.blogDetails.user_id;
            // },

            // category(){
            //     return this.blogDetails.category_id;
            // },

            // simillerCats(){
            //     return this.$store.getters['Blogs/blogs'].filter(coach => coach.category_id == this.blogDetails.category_id);
            // }
        },

        mounted(){
            console.log("Mounted");
            this.blogDetails = this.$store.getters['Blogs/blogDetails'];
            console.log(this.blogDetails);
        },

        created(){
            console.log("Created");
            this.blogId = this.$route.params.id;
            this.loadSingleBlog();
        }
    }
</script>