import {createRouter, createWebHistory} from "vue-router";
import Calculator from "../view/Calculator.vue";
import Contact from "../view/Contact.vue";
import NotFound from "../view/NotFound";
import LogIn from "../view/LogIn";

const routes = [
    {
        path:'/calculator',
        name: 'Calculator',
        component: Calculator
    },
    {
        path:'/',
        name: 'LogIn',
        component: LogIn
    },
    {
        path: '/contact',
        name:'Contact',
        component: Contact
    },
    {
        path: '/:catchAll(.*)',
        name:'NotFound',
        component: NotFound
    }
];
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;