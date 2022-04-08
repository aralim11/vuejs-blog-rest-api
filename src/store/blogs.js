export default {
    namespaced: true,
    state(){
        return {
            blogs: 'Data',
        }
    },

    getters: {
        blog(state){
            return state.blogs;
        }
    }
}