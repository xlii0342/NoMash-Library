<template>
  <h1>Create an Account</h1>
  <p><input type="text" placeholder="Email" v-model="email" /></p>
  <p><input type="password" placeholder="Password" v-model="password" /></p>
  <p><button @click="register">Save to Firebase</button></p>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router"; // 只使用 useRouter
import { isAuthenticated } from '../router/index.js'; // 只保留 isAuthenticated 的导入

const email = ref("");
const password = ref("");
const auth = getAuth();
const router = useRouter(); // 保留这个 router 的定义

const register = () => {
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
      isAuthenticated.value = true; // 成功注册后设置 isAuthenticated
      router.push({ name: 'About' }); // 重定向到 'About' 页面
    })
    .catch((error) => {
      console.log(error.code); // 打印错误信息
    });
};
</script>

<style></style>
