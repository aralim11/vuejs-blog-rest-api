import { createStore } from 'vuex';
import Blogs from './blogs.js';
import Auth from './auth.js';
import Category from './backEnd/category.js';
import userBlogs from './backEnd/userBlogs.js';

const store = createStore({
    modules: {
        Blogs: Blogs,
        Auth: Auth,
        Category: Category,
        userBlogs: userBlogs,
    }
});

export default store;