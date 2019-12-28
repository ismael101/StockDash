import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index'
import Volume from '../views/Volume'
import Technical from '../views/Technical'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component:Index
  },
  {
    path:'/volume',
    name:'volume',
    component:Volume
  },
  {
    path:'/technical',
    name:'technical',
    component:Technical
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
