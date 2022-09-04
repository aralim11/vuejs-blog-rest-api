export default {
    namespaced: true,
    state(){
        return {
            blogs: [],
            blogDetails: [],
            simillerBlogs: [],
        }
    },

    mutations: {
        setBlogs(state, payload){
            state.blogs = payload;
        },

        setBlogDetails(state, payload){
            state.blogDetails = payload;
        },

        setSimillerBlogs(state, payload){
            state.simillerBlogs = payload;
        }
    },

    actions: {
        async loadBlogs(context){
            const resp = await fetch(`http://127.0.0.1:8000/api/blogs`);
            const respData = await resp.json();
            const blogs = [];
            
            if (respData.status != 'success') {
                const error = new Error('Failed to Fetch');
                throw error;
            }

            for(const key in respData['msg']) {
                const blog = {
                    id: respData['msg'][key].id,
                    user_id: respData['msg'][key].user_name.name,
                    category_id: respData['msg'][key].category_name.cat_name,
                    title: respData['msg'][key].title,
                    details: respData['msg'][key].details,
                    image: respData['msg'][key].image,
                }
                blogs.push(blog);
            }

            context.commit('setBlogs', blogs);
        },

        async loadSingleBlog(context, payload){
            context.commit('setBlogDetails', []);
            context.commit('setSimillerBlogs', []);
            const resp = await fetch(`http://127.0.0.1:8000/api/blogs/`+payload.id);
            const respData = await resp.json();

            if (respData.status != 'success') {
                const error = new Error('Failed to Fetch');
                throw error;
            }
            
            const blog = {
                id: respData['msg'].id,
                user_id: respData['msg'].user_name.name,
                category_name: respData['msg'].category_name.cat_name,
                category_id: respData['msg'].category_id,
                title: respData['msg'].title,
                details: respData['msg'].details,
                image: respData['msg'].image,
                created_at: respData['msg'].created_at,
            }
            await context.dispatch('loadSimillerBlogs', {catId: respData['msg'].category_id, id: respData['msg'].id});
            context.commit('setBlogDetails', blog);
        },

        async loadSimillerBlogs(context, payload){
            const resp = await fetch(`http://127.0.0.1:8000/api/blogs-similler-cat/`+payload.catId);
            const respData = await resp.json();
            const blogs = [];

            if (respData.status != 'success') {
                const error = new Error('Failed to Fetch');
                throw error;
            }

            for(const key in respData['msg']) {
                if (respData['msg'][key].id != payload.id) {
                    const blog = {
                        id: respData['msg'][key].id,
                        title: respData['msg'][key].title,
                        image: respData['msg'][key].image,
                    }
                    blogs.push(blog); 
                }
            }
            context.commit('setSimillerBlogs', blogs); 
        }
    },

    getters: {
        blogs(state){
            return state.blogs;
        },

        blogDetails(state){
            return state.blogDetails;
        },

        simillerBlogs(state){
            return state.simillerBlogs;
        },

        hasBlogs(state){
            return state.blogs && state.blogs.length > 0;
        }
    }
}