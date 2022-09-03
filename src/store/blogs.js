export default {
    namespaced: true,
    state(){
        return {
            blogs: [],
            blogDetails: null,
        }
    },

    mutations: {
        setBlogs(state, payload){
            state.blogs = payload;
        },

        setBlogDetails(state, payload){
            state.blogDetails = payload;
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
            console.log(payload);
            const resp = await fetch(`http://127.0.0.1:8000/api/blogs/`+payload.id);
            const respData = await resp.json();

            if (respData.status != 'success') {
                const error = new Error('Failed to Fetch');
                throw error;
            }
            
            const blog = {
                id: respData['msg'].id,
                user_id: respData['msg'].user_name.name,
                category_id: respData['msg'].category_name.cat_name,
                title: respData['msg'].title,
                details: respData['msg'].details,
                image: respData['msg'].image,
            }
            console.log(blog);
            context.commit('setBlogDetails', blog);
        }
    },

    getters: {
        blogs(state){
            return state.blogs;
        },

        blogDetails(state){
            return state.blogDetails;
        },

        hasBlogs(state){
            return state.blogs && state.blogs.length > 0;
        }
    }
}