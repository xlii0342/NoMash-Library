<template>

    <h1>Login via Firebase</h1>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p><button @click="login">Login</button></p>

</template>
  
<script setup>
import { ref } from "vue"
import {getAuth, signInWithEmailAndPassword} from "firebase/auth" 
import {useRouter} from "vue-router"
const email = ref ("")
const pwd = ref("")
const router = useRouter()
const auth = getAuth()
const login = () => {
    const userEmail = email.value
    const userPassword = pwd.value
    signInWithEmailAndPassword (getAuth(), userEmail, userPassword)
    .then ((data) => {
        console. log(auth.currentUder)
        router.push("/")
        console.log(auth.currentUser) 
    }).catch((error) => {
        console.log(error.code);
    })
};
</script>

<style>
</style>