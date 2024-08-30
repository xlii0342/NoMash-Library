<script setup>
import { ref, watch } from 'vue'
import router, { isAuthenticated } from '../router/index.js'
import { useRouter } from 'vue-router'

const user = 'user'
const pwd = 'user'
const myRouter =useRouter()

const formData = ref({
  username: '',
  password: ''
})

const submitForm = () => {
    if(formData.value.username === user && formData.value.password ===pwd){
        isAuthenticated.value = true
        router.push({ name: 'About' })   
    } else {  
        alert("error")
    }
}
 

</script>

<template>
  <!-- 🗄️ W3. Library Login Form -->
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h1 class="text-center">🗄️ W4. Library Login Form</h1>
        <p class="text-center">
          Allowe user to login to our Library System
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
  /* background-color: #e0bfbf; */
  border-radius: 10px;
}


</style>
