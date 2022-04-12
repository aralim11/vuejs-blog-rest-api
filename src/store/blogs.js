export default {
    namespaced: true,
    state(){
        return {
            blogs: [],
        }
    },

    mutations: {
        setBlogs(state, payload){
            state.blogs = payload;
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
                    user_id: respData['msg'][key].user_id,
                    category_id: respData['msg'][key].category_id,
                    title: respData['msg'][key].title,
                    details: respData['msg'][key].details,
                    image: respData['msg'][key].image,
                }
                blogs.push(blog);
            }

            context.commit('setBlogs', blogs);
        }
    },

    getters: {
        blogs(state){
            return state.blogs;
        },

        hasBlogs(state){
            return state.blogs && state.blogs.length > 0;
        }
    }
}