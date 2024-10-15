import {createRouter, createWebHashHistory} from "vue-router";
import Home from "@/pages/Home.vue";
import Login from "@/pages/Login.vue";
import Cart from "@/pages/Cart.vue";
import Order from "@/pages/Order.vue";

const routes = [
    {path: '/', component: Home},
    {path: '/login', component: Login},
    {path: '/cart', component: Cart},
    {path: '/order', component: Order}
]

const router = createRouter({
    mode: 'history',
    history: createWebHashHistory(),
    routes
})

export default router;
