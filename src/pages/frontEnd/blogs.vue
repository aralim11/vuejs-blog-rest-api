<template>
    <div v-if="hasBlogs" class="row row-cols-1 row-cols-md-3 mb-3 text-center">
        <blog-list v-for="loadBlog in loadBlogs"
        v-bind:key="loadBlog.id"
        v-bind:id="loadBlog.id"
        v-bind:user_id="loadBlog.user_id"
        v-bind:category_id="loadBlog.category_id"
        v-bind:title="loadBlog.title"
        v-bind:image="loadBlog.image"
        ></blog-list>
    </div>

    <div v-else class="row row-cols-1 row-cols-md-3 mb-3 text-center">
        <no-data></no-data>
    </div>
</template>

<script>
    import BlogList from './../../components/blogs/blogsList.vue';
    

    export default {
        components: {
            'blog-list': BlogList,
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