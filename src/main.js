import { createApp } from 'vue';
import { ContentLoader } from "vue-content-loader";
import VueSweetalert2 from 'vue-sweetalert2';
import App from './App.vue';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import router from './router.js';
import store from './store/index.js';


import noDataFound from './components/noDataFound.vue';

const app = createApp(App);

app.use(router);
app.use(store);
app.use(VueSweetalert2);
app.component('no-data', noDataFound);
app.component('content-loader', ContentLoader);

app.mount('#app');
