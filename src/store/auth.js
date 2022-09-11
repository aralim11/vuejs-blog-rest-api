export default {
    namespaced: true,
    state(){
        return {
            token: null,
            userId: null
        }
    },

    mutations: {
        setUser(state, payload){
            state.token = payload.token;
            state.userId = payload.userId;
        }
    },

    actions: {
        async login(context, payload){
            const resp = await fetch(`http://127.0.0.1:8000/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: payload.email,
                    password: payload.password,
                })
            });

            const respData = await resp.json();
            if (!resp.ok) {
                const error = new Error(respData.message || "Failed To Register!!");
                throw error;
            }

            context.commit('setUser', respData);
        },

        async registration(context, payload){
            const resp = await fetch(`http://127.0.0.1:8000/api/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: payload.email,
                    name: payload.name,
                    password: payload.password,
                })
            });

            const respData = await resp.json();
            if (!resp.ok) {
                const error = new Error(respData.message || "Failed To Register!!");
                throw error;
            }

            context.commit('setUser', respData);
        },

        logout(context){
            context.commit('setUser', {
                token: null,
                userId: null,
            });
        }
    },

    getters: {
        userId(state){
            return state.userId;
        },

        token(state){
            return state.token;
        },

        isAuthenticated(state){
            return !!state.token;
        }
    }
}