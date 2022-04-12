import { createApp } from 'vue';
import App from './App.vue';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import router from './router.js';
import store from './store/index.js';

import noDataFound from './components/noDataFound.vue';

const app = createApp(App);

app.use(router);
app.use(store);

app.component('no-data', noDataFound);

app.mount('#app');
