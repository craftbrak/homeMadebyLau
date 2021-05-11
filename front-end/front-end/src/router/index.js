import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store/index'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      guest: true
    }
  },
  {
    path: '/about',
    name: 'About',
    meta: {
      guest: true
    },

    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/addrecipe',
    name: 'addRecipe',
    meta: {
      requiresAuth: true,
      is_admin: true
    },
    component: () => import('../views/AddRecipe.vue')
  },
  {
    path: '/test',
    name: 'test',
    meta: {
      requiresAuth: true,
      is_admin: true
    },
    component: () => import('../views/test.vue')
  },
  {
    path: '/login',
    name: 'logIn',
    meta: {
      guest: true
    },
    component: () => import('../views/login.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      guest: true
    },
    component: () => import('../views/register.vue')
  },
  {
    path: '/logout',
    name: 'logout',
    meta: {
      requiresAuth: true
    },
    component: () => import('../views/logout.vue')
  }
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    console.log('t')
    if (store.state.user_name === null) {
      next({
        path: '/login',
        name: 'login'
      })
    } else {
      if (to.matched.some(record => record.meta.is_admin)) {
        if (store.state.user_right === 10) {
          next()
        } else {
          next('/')
        }
      } else {
        next()
      }
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    next()
  } else {
    next({
      path: '/login'
    })
  }
})

export default router
