import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import GetBookCountView from '../views/GetBookCountView.vue'
import FirebaseRegisterView from '../views/FirebaseRegisterView.vue'
import AddBookView from '@/views/AddBookView.vue'
import { ref } from 'vue'
import WeatherView from '../views/WeatherView.vue'
import CountBookAPI from '../views/CountBookAPI.vue';
import GetAllBookAPI from '../views/GetAllBookAPI.vue';
const isAuthenticated = ref(false)  

const routes = [

  {
    path: '/login',  
    name: 'Login',
    component: LoginView
  },

  {
    path: '/about',
    name: 'About',
    component: AboutView,
    
  
  },
  {
    path: '/home',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/firesignup',
    name: 'FirebaseSignup',
    component: FirebaseRegisterView
  },
  {
    path: '/addbook',
    name: 'AddBook',
    component: AddBookView,
    beforeEnter: (to, from, next) => {
      if (!isAuthenticated.value) next({ name: 'Login' })  
      else next()
    }
  },
  {
    path: '/GetBookCount',
    name: 'GetBookCount',
    component: GetBookCountView
  },
  {
    path: '/WeatherCheck',
    name: 'WeatherCheck',
    component: WeatherView
  },
  {
    path: '/CountBookAPI',
    name: 'CountBookAPI',
    component: CountBookAPI
  },
  {
    path: '/GetAllBookAPI',
    name: 'GetallBookAPI',
    component: GetAllBookAPI
  },
  {
    path: '/:catchMatch(.*)*',  
    redirect: { name: 'Home' }  
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export { isAuthenticated }
export default router
