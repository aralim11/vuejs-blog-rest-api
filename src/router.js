import { createRouter, createWebHistory } from 'vue-router';
import Blogs from './pages/frontEnd/blogs.vue';
import Dash from './pages/backEnd/dash.vue';
import SignIn from './pages/auth/signIn.vue';
import SignUp from './pages/auth/signUp.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', component: Blogs},
        {path: '/sign-in', component: SignIn},
        {path: '/sign-up', component: SignUp},
        {path: '/dash', component: Dash},
    ]
});

export default router;