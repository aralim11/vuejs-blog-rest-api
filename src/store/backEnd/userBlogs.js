export default {
    namespaced: true,
    state() {
        return {
            userBlogs: null,
        }
    },

    mutations: {
        setUserBlogs(state, paylaod){
            state.userBlogs = paylaod;
        }
    },

    actions: {
        async addUserBlog(context, paylaod){
            const resp = await fetch(`http://127.0.0.1:8000/api/blog`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                },
                body: JSON.stringify({
                    category_id: paylaod.category_id,
                    title: paylaod.title,
                    details: paylaod.details,
                })
            });

            if (!resp.ok) {
                const error = new Error(respData.message || "Failed To Load Blog Data!!");
                throw error;
            }

            const respData = await resp.json();

            if (respData.status == 'success') {
                await context.dispatch('loadUserBlogs');
            }
        },

        async loadUserBlogs(context){
            const resp = await fetch(`http://127.0.0.1:8000/api/blog`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                },
            });

            if (!resp.ok) {
                const error = new Error(respData.message || "Failed To Load Blog Data!!");
                throw error;
            }
            
            const respData = await resp.json();
            const blogs = [];

            for(const key in respData['msg']) {
                const blog = {
                    id: respData['msg'][key].id,
                    category_id: respData['msg'][key].category_name.cat_name,
                    title: respData['msg'][key].title,
                    status: respData['msg'][key].status,
                    created_at: respData['msg'][key].created_at,
                }
                blogs.push(blog);
            }
            
            context.commit('setUserBlogs', blogs);
        }
    },

    getters: {
        userBlogs(state){
            return state.userBlogs;
        },

        hasBlogs(state){
            return state.userBlogs && state.userBlogs.length > 0;
        },
    },
}