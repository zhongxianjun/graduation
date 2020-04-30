import Vue from 'vue'
import Router from 'vue-router'
//pages
import Login from '@/pages/login'
import Register from '@/pages/register'
import Admin from '@/pages/admin'
import Index from '@/pages/index'
import Details from '@/pages/details'
import FoodKind from '@/pages/foodKind'
import Search from '@/pages/search'
import Video from '@/pages/video'
import MesBoard from '@/pages/mesBoard'
import UserCenter from '@/pages/userCenter'
//components

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
    },
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    {
      path: '/video',
      name: 'Video',
      component: Video
    },
    {
      path: '/mesBoard',
      name: 'MesBoard',
      component: MesBoard
    },
    {
      path: '/userCenter',
      name: 'UserCenter',
      component: UserCenter
    },
    {
      path: '/details/:id',
      name: 'Details',
      component: Details
    },
    {
      path: '/foodKind/:id',
      name: 'FoodKind',
      component: FoodKind
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    }
  ]
})
