import { createApp } from 'vue'
import store from '@/scripts/store';
import App from './App.vue'
import router from '@/scripts/router';

const app = createApp(App);

app.use(store);
app.use(router);

app.mount('#app');
