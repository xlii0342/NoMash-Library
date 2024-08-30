import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import {ref} from 'vue'

const isAuthenticated = ref(false)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
    beforeEnter:(to,from,next)=>{
        if(!isAuthenticated.value) next({name: 'login' })
        else next()
    }
  },
  {
    path: '/Login',
    name: 'Login',
    component: LoginView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export { isAuthenticated}
export default router