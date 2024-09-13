import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {initializeApp} from "firebase/app"
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
const firebaseConfig = {
    apiKey: "AIzaSyDjcoUJgGDheZAPW86PeRmjtp7BoeVIhd8",
    authDomain: "week7-xinyu-29876.firebaseapp.com",
    projectId: "week7-xinyu-29876",
    storageBucket: "week7-xinyu-29876.appspot.com",
    messagingSenderId: "195580207290",
    appId: "1:195580207290:web:be4cba03a83edd03072283"
  };
initializeApp(firebaseConfig)

const app = createApp(App)
app.use(PrimeVue, { theme: { preset: Aura } })
app.use(router)

app.mount('#app')
