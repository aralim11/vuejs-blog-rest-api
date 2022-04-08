import { createStore } from 'vuex';
import Blogs from './blogs.js';

const store = createStore({
    modules: {
        Blogs: Blogs
    }
});

export default store;