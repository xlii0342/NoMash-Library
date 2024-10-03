<template>
    <!-- 🗄️ Firebase Sign Up Form -->
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-8 offset-md-2">
                <h1 class="text-center">🗄️ Firebase Sign Up Form</h1>
                <p class="text-center">
                    Allow user to create a new account in our system
                </p>
                <form @submit.prevent="submitForm">
                    <div class="row mb-3">
                        <div class="col-md-6 col-sm-6 offset-3">
                            <label for="username" class="form-label">Username (Email)</label>
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
                        <button type="submit" class="btn btn-primary me-2">Sign up</button>
                    </div>
                    <div class="text-center mt-3">
                        Already have an account? Click <router-link to="/login">
                            <Button label="here" link style="color: blue;" />
                        </router-link>to sign in!
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../firebase/init'  // 导入 Firestore 实例
import { isAuthenticated } from '../router/index.js'
import Button from 'primevue/button';

// Initialize Firebase Auth
const auth = getAuth();  
const router = useRouter()

const formData = ref({
    username: '',
    password: '',
})

// 验证电子邮件格式
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const submitForm = async () => {
    const userEmail = formData.value.username.trim();
    const userPassword = formData.value.password.trim();

    // 检查输入是否为空
    if (!userEmail || !userPassword) {
        alert('Please enter both email and password.');
        return;
    }

    // 验证电子邮件格式
    if (!validateEmail(userEmail)) {
        alert('Please enter a valid email address.');
        return;
    }

    // 密码长度检查
    if (userPassword.length < 6) {
        alert('Password must be at least 6 characters long.');
        return;
    }

    try {
        // 使用 Firebase Authentication 创建用户
        const { user } = await createUserWithEmailAndPassword(auth, userEmail, userPassword);

        // 创建用户 Firestore 文档
        await setDoc(doc(db, 'users', user.uid), {
            email: userEmail,
            role: 'user',
        });

        isAuthenticated.value = true;  // 用户已认证

        alert('Sign up successful!!');
        router.push({ name: 'About' });
    } catch (error) {
        console.error('Sign-up error:', error);
        alert(`Sign-up failed: ${error.message}`);
    }
}
</script>   

<style scoped>
.container {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    max-width: 80vw;
    margin: 0 auto;
    padding: 20px;
    border-radius: 10px;
}
</style>
