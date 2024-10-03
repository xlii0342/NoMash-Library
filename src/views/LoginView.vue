<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { isAuthenticated } from '../router/index.js'; // 从路由文件中导入认证状态
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'; // 使用模块化导入
import { doc, getDoc } from 'firebase/firestore'; // 从 Firestore 导入必要方法
import { db } from '../firebase/init'; // 确保 Firestore 实例正确导入
import Button from 'primevue/button';

const router = useRouter(); // 路由实例

const formData = ref({
  username: '',
  password: '',
});

// 表单提交函数
const submitForm = async () => {
  const userEmail = formData.value.username.trim();
  const userPassword = formData.value.password.trim();

  // 检查用户输入
  if (!userEmail || !userPassword) {
    alert('Please enter both email and password.');
    return;
  }

  try {
    // 使用 Firebase Authentication 登录
    const { user } = await signInWithEmailAndPassword(getAuth(), userEmail, userPassword);

    // 获取 Firestore 中用户的角色信息
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const userData = userSnap.data();
      isAuthenticated.value = {
        user: user,
        role: userData.role,  
      };
      console.log(`Logged in as ${userData.role}`);
      router.push({ name: 'About' }); // 登录成功后跳转
    } else {
      console.error('No user document found in Firestore');
    }
  } catch (error) {
    console.error('Error logging in:', error);
    alert(error.message);
  }
};
</script>

<template>
    <!-- 🗄️ Firebase Login Form -->
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-8 offset-md-2">
                <h1 class="text-center">🗄️ Firebase Login Form</h1>
                <p class="text-center">
                    Allow user to login to our library system
                </p>
                <form @submit.prevent="submitForm">
                    <div class="row mb-3">
                        <div class="col-md-6 col-sm-6 offset-3">
                            <label for="username" class="form-label">Username</label>
                            <input type="text" class="form-control" id="username" v-model="formData.username" />
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-md-6 col-sm-6 offset-3">
                            <label for="password" class="form-label">Password</label>
                            <input type="password" class="form-control" id="password" v-model="formData.password" />
                        </div>
                    </div>
                    <div class="text-center">
                        <button type="submit" class="btn btn-primary me-2">Login</button>
                    </div>
                    <div class="text-center mt-3">
                        Don't have an account? Click <router-link to="/firesignup"><Button label="here" link
                                style="color: blue;" /> </router-link>to create!
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
