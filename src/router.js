import { createRouter, createWebHistory } from 'vue-router';
import Blogs from './pages/frontEnd/blogs.vue';
import BlogView from './pages/frontEnd/blogView.vue';
import Dash from './pages/backEnd/dash.vue';
import SignIn from './pages/auth/signIn.vue';
import SignUp from './pages/auth/signUp.vue';
import notFound from './pages/notFound.vue';
import store from './store/index.js';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', component: Blogs},
        {path: '/details/:id', name:'details', component: BlogView},
        {path: '/sign-in', component: SignIn, meta: {requiresUnAuth: true}},
        {path: '/sign-up', component: SignUp, meta: {requiresUnAuth: true}},
        {path: '/dash', component: Dash, meta: {requiresAuth: true}},
        {path: '/:notFound(.*)', component: notFound},
    ]
});

router.beforeEach(function(to, from, next){
    if (to.meta.requiresAuth && !store.getters['Auth/isAuthenticated']) {
        next('/sign-in');
    } else if (to.meta.requiresUnAuth && store.getters['Auth/isAuthenticated']) {
        next('/dash');
    } else {
        next();
    }
});

export default router;