import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index'
import Technical from '../views/Technical'
import NotFound from '../views/NotFound'
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
    path:'*',
    name:'notfound',
    component:NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
