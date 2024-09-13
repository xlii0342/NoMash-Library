<script setup>
import { ref } from 'vue'
import db from '../firebase/init'
import { collection,addDoc } from 'firebase/firestore'


const isbn = ref('')
const name = ref('')

const addbook = async () => {
  alert(isbn.value + name.value)
  try {
    const isbnNumber = Number(isbn.value)
    if (isNaN(isbnNumber)) {
      alert('ISBN must be a valid number')
      return
    }

    await addDoc(collection(db, 'books'), {
      isbn: isbnNumber,
      name: name.value
    })
    isbn.value='';
    name.value='';
    alert('book added successful')
  } catch (error) {
    console.error('Error info:',error)
  }
}
</script>


<template>
  <div>
    <h1>Add Book</h1>
    <form @submit.prevent="addbook">
      <div> 
        <label for="isbn">ISBN:</label>
        <input type="text" v-model="isbn" id="isbn" required />
      </div>
      <div>
        <label for="name">Name:</label>
        <input type="text" v-model="name" id="name" required />
      </div>
      <button type ="submit">Add book</button>
    </form>
  </div>
</template>
