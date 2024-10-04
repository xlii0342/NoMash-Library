<template>
    <pre>{{ books }}</pre>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { collection, query, getDocs } from 'firebase/firestore'; 
import { db } from '../firebase/init.js'; 

const books = ref([]);  



const fetchBooks = async () => {
    try {
        let q;
            q = query(
                collection(db, 'books'),
            );
        
        const querySnapshot = await getDocs(q);
        const booksArray = [];
        querySnapshot.forEach((doc) => {
            booksArray.push({ id: doc.id, ...doc.data() });
        });
        books.value = booksArray;
    } catch (error) {
        console.error('Error fetching books: ', error);
    }
};

onMounted(() => {
    fetchBooks();
});
</script>
