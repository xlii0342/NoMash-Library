<template>
    <div>
        <h1>Add Book</h1>
        <form @submit.prevent="addBook">
            <div>
                <label for="isbn">ISBN:</label>
                <input type="text" v-model="isbn" id="isbn" required />
            </div>
            <div>
                <label for="name">Name:</label>
                <input type="text" v-model="name" id="name" required />
            </div>
            <button type="submit">Add Book</button>
        </form>
        <BookList />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { collection, addDoc } from 'firebase/firestore';  // 从 Firestore 模块化导入
import { db } from '../firebase/init.js';  // 确保 Firestore 实例已初始化
import BookList from '@/components/icons/BookList.vue';

const isbn = ref('');
const name = ref('');

const addBook = async () => {
    try {
        const isbnNumber = Number(isbn.value);
        if (isNaN(isbnNumber)) {
            alert('ISBN must be a valid number');
            return;
        }

        // 使用 Firestore 模块化 API 添加书籍数据
        await addDoc(collection(db, 'books'), {
            isbn: isbnNumber,
            name: name.value,
        });

        // 重置表单
        isbn.value = '';
        name.value = '';
        alert('Book added successfully!');
    } catch (error) {
        console.error('Error adding book:', error);
    }
};
</script>
