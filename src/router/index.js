import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import FirebaseRegisterView from '../views/FirebaseRegisterView.vue'
// import LoginWithFirebaseView from '../views/LoginWithFirebaseView.vue'
import AddBookView from '@/views/AddBookView.vue'
import {ref} from 'vue'

const isAuthenticated = ref(null)

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
  },
  {
    path: '/firesignup',
    name:'FirebaseSignup',
    component: FirebaseRegisterView
  },
  {
    path: '/addbook',
    name:'AddBook',
    component: AddBookView
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export { isAuthenticated}
export default router