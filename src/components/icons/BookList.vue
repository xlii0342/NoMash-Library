<template>
    <div>
        <h1>Books with ISBN > 1000</h1>
        <ul>
            <li v-for="book in books" :key="book.id">
                {{ book.name }} - ISBN: {{ book.isbn }}
                <button @click="editBook(book)">Edit</button>
                <button @click="deleteBook(book.id)">Delete</button>
            </li>
        </ul>

        <button @click="toggleShowAll">
            {{ showAll ? 'Show Top 5 Books' : 'Show All Books' }}
        </button>


        <div v-if="editingBook">
            <h2>Edit Book</h2>
            <form @submit.prevent="updateBook(editingBook.id)">
                <label for="name">Name:</label>
                <input type="text" v-model="editingBook.name" />

                <label for="isbn">ISBN:</label>
                <input type="number" v-model="editingBook.isbn" />

                <button type="submit">Update Book</button>
                <button @click="cancelEdit">Cancel</button>
            </form>
        </div>
    </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import { collection, query, where, orderBy, limit, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import db from '../../firebase/init.js';


const books = ref([]);
const showAll = ref(false); 
const editingBook = ref(null);


const fetchBooks = async () => {
    try {
        let q;
        if (showAll.value) {
           
            q = query(
                collection(db, 'books'),
                where('isbn', '>', 1000),
                orderBy('isbn', 'asc')
            );
        } else {
            // 仅显示前 5 本书籍
            q = query(
                collection(db, 'books'),
                where('isbn', '>', 1000),
                orderBy('isbn', 'asc'),
                limit(5)
            );
        }
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


const toggleShowAll = () => {
    showAll.value = !showAll.value;
    fetchBooks(); 
}
const editBook = (book) => {
    editingBook.value = { ...book }; 
};


const cancelEdit = () => {
    editingBook.value = null;
};

// 更新书籍
const updateBook = async (bookId) => {
    try {
        const bookRef = doc(db, 'books', bookId);
        await updateDoc(bookRef, {
            name: editingBook.value.name,
            isbn: editingBook.value.isbn,
        });
        console.log('Book updated successfully');
        fetchBooks(); 
        editingBook.value = null; 
    } catch (error) {
        console.error('Error updating book: ', error);
    }
};


const deleteBook = async (bookId) => {
    try {
        const bookRef = doc(db, 'books', bookId);
        await deleteDoc(bookRef);
        console.log('Book deleted successfully');
        fetchBooks(); 
    } catch (error) {
        console.error('Error deleting book: ', error);
    }
};

onMounted(() => {
    fetchBooks();
});
</script>