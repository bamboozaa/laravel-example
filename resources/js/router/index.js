import { createRouter, createWebHistory } from "vue-router";

// import home from '../components/HomePage.vue';
import productIndex from '../components/products/index.vue';
import productForm from '../components/products/Form.vue';

import about from '../components/AboutPage.vue';
import notFound from '../components/NotfoundPage.vue';

const routes = [
    // {
    //     path: '/',
    //     component: home
    // },
    {
        path: '/',
        name: 'products.index',
        component: productIndex
    },

    {
        path: '/products/create',
        name: 'products.create',
        component: productForm
    },

    {
        path: '/about',
        component: about
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'notfound',
        component: notFound
    }
];

const router = createRouter({
    history: createWebHistory(),
    linkExactActiveClass: 'active',
    routes,
});

export default router;


