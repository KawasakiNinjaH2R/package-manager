import { createRouter, createWebHistory,  RouteRecordRaw } from 'vue-router'
const Table =()=>import('../pages/Table.vue')
import Detail from '../pages/Detail.vue'


const routes: Array<RouteRecordRaw>=[
    {
        path:'/',
        component:Table
    },
    {
        path:'/detail/:name',
        component:Detail,
        props:true
    }
]
const router = createRouter({  
    history: createWebHistory(),  
    routes
})

export default router