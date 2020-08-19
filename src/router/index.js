import Vue from 'vue'
import VueRouter from 'vue-router'
import Cybercom from '../views/Cybercom.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Cybercom',
    component: Cybercom
}, ]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router