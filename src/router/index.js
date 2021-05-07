import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store/index'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/test',
    name: 'test',
    component: () => import(/* webpackChunkName: "test" */ '../views/UserHome.vue')
  },
  // {
  //   path: '/adresse-2',
  //   name: 'adresse-2',
  //   component: () => import(/* webpackChunkName: "test" */ '../components/HomeAdresse.vue')
  // },
  {
    path: '/adresse',
    name: 'Adresse',
    component: () => import(/* webpackChunkName: "adresse" */ '../components/HomeAdresse.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
    
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//* permet de voir si une route a un champ meta avant d'être rendu *//
router.beforeEach((to, from, next) => {
  //console.log(`navigue de ${from.name} vers ${to.name}`)
  //console.log('store : ', store.getters.isAuthenticated ,'tomatched : ' ,to.matched,'state : ', store.state)
  if (to.meta.requiresAuth) {
    if (!store.state.authenticated) {
      next({ name: 'Login' })
    } else {
      next({ name: 'Adresse' })
    }
  } else {
    next()
  }
})


export default router
