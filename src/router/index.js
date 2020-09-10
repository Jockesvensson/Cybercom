import Vue from 'vue'
import VueRouter from 'vue-router'
import Cybercom from '../views/Cybercom.vue'
import Bingo from '../views/Bingo.vue'
import startBingo from '../views/startBingo.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Cybercom',
        component: Cybercom
    },
    {
        path: '/startBingo',
        name: 'startBingo',
        component: startBingo
    },
    {
        path: '/bingo',
        name: 'Bingo',
        component: Bingo
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router