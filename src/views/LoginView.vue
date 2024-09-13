<script setup>
import { ref } from 'vue'
import router, { isAuthenticated } from '../router/index.js'
import { useRouter } from 'vue-router'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import Button from 'primevue/button' 

const formData = ref({
  username: '',
  password: ''
})

const submitForm = () => {
  const userEmail = formData.value.username
  const userPassword = formData.value.password
  signInWithEmailAndPassword(getAuth(), userEmail, userPassword)
    .then((data) => {
      console.log(getAuth().currentUser)
      isAuthenticated.value = getAuth().currentUser
      router.push({ name: 'About' })
    })
    .catch((error) => {
      alert(error.code)
    })
}


</script>

<template>
  <!-- 🗄️ W3. Library Login Form -->
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h1 class="text-center">🗄️ Firebase Login Form</h1>
        <p class="text-center">
          Allow user to login to our System
        </p>
        <form @submit.prevent="submitForm">
          <div class="row mb-3">
            <div class="col-md-6 col-sm-6 offset-3">
              <label for="username" class="form-label">Username</label>
              <input
                type="text"
                class="form-control"
                id="username"
                v-model="formData.username"/>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-md-6 col-sm-6 offset-3">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                v-model="formData.password"/>
            </div>
          </div>
          
          <div class="text-center">
            <button type="submit" class="btn btn-primary me-2">Login</button>
          </div>
          <div class="text-center mt-4">
            if you don't have account, Click 
            <router-link to=/firesignup><Button label="Here" class="p-button-link" /> </router-link> 
            
            to create new one
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 80vw;
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
}
</style>
