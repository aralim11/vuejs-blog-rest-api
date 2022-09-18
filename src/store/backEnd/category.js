export default {
    namespaced: true,
    state() {
        return {
            categpries: [],
        }
    },

    mutations: {
        setCategories(state, paylaod){
            state.categpries = paylaod;
        }
    },

    actions: {
        async addCategory(context, paylaod){
            const resp = await fetch(`http://127.0.0.1:8000/api/category`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                },
                body: JSON.stringify({
                    cat_name: paylaod.cat_name,
                })
            });

            const respData = await resp.json();

            if (!resp.ok) {
                const error = new Error(respData.message || "Failed To Add Category!!");
                throw error;
            }

            if (respData.status == 'success') {
                await context.dispatch('loadCategories');
            }
        },

        async loadCategories(context){
            const resp = await fetch(`http://127.0.0.1:8000/api/category`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                },
            });
            const respData = await resp.json();
            const categpries = [];
            
            if (respData.status != 'success') {
                const error = new Error('Failed to Fetch');
                throw error;
            }

            for(const key in respData['msg']) {
                const category = {
                    id: respData['msg'][key].id,
                    user_id: respData['msg'][key].user_id,
                    cat_name: respData['msg'][key].cat_name,
                    created_at: respData['msg'][key].created_at,
                }
                categpries.push(category);
            }

            context.commit('setCategories', categpries);
        },
    },

    getters: {
        categories(state){
            return state.categpries;
        },

        hasCategory(state){
            return state.categpries && state.categpries.length > 0;
        }
    }
}