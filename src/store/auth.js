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
            
            if (respData.status == 'success') {
                localStorage.setItem('token', respData.token);
                localStorage.setItem('userId', respData.userId);
                context.commit('setUser', respData);
            }
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

            if (respData.status == 'success') {
                localStorage.setItem('token', respData.token);
                localStorage.setItem('userId', respData.userId);
                context.commit('setUser', respData);
            }
        },

        async logout(context){
            const resp = await fetch(`http://127.0.0.1:8000/api/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                },
            });

            const respData = await resp.json();
            if (!resp.ok) {
                const error = new Error(respData.message || "Failed To Logout!!");
                throw error;
            }

            if (respData.status == 'success') {
                localStorage.removeItem('token');
                localStorage.removeItem('userId');
    
                context.commit('setUser', {
                    token: null,
                    userId: null,
                });
            }
        },

        tryLogin(context){
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');

            if(token && userId){
                context.commit('setUser', {
                    token: token,
                    userId: userId
                })
            }
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