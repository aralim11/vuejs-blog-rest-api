<template>
    <home-blog-loder v-if="isloadingBlog"/>

    <section v-else>
        <div v-if="hasBlogs" class="row row-cols-1 row-cols-md-3 mb-3 text-center">
            <blog-list v-for="loadBlog in loadBlogs"
            v-bind:key="loadBlog.id"
            v-bind:id="loadBlog.id"
            v-bind:user_id="loadBlog.user_id"
            v-bind:category_id="loadBlog.category_id"
            v-bind:title="loadBlog.title"
            v-bind:image="loadBlog.image"
            v-bind:created_at="loadBlog.created_at"
            ></blog-list>
        </div>

        <div v-else class="row row-cols-1 row-cols-md-3 mb-3 text-center">
            <no-data></no-data>
        </div>
    </section>
</template>

<script>
    import BlogList from './../../components/frontEnd/blogs/blogsList.vue';
    import homeBlogLoder from './../../components/ui/homeBlogLoder.vue';
    
    export default {
        components: {
            'blog-list': BlogList,
            'home-blog-loder': homeBlogLoder,
        },

        data(){
            return{
                isloadingBlog: true,
            }
        },

        methods: {
            async blogs(){
                await this.$store.dispatch('Blogs/loadBlogs');
                this.isloadingBlog = false;
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