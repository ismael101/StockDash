import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index'
import Info from '../views/Info'
import Technical from '../views/Technical'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component:Index
  },
  {
    path:'/technical',
    name:'technical',
    component:Technical
  },
  {
    path:'/info',
    name:'info',
    component:Info
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
