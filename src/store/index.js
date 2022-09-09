import { createStore } from 'vuex';
import Blogs from './blogs.js';
import Auth from './auth.js';

const store = createStore({
    modules: {
        Blogs: Blogs,
        Auth: Auth
    }
});

export default store;