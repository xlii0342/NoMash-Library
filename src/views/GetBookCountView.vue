<template>
    <div class="row mt-5 about">
  
        <h1 class = "text-center "> Book Counter </h1>   
        <button @click="getBookCount">Get Book Count</button>
        <p v-if="count !== null">Total number of books: {{ count }}</p>
        <p v-if="error">({ error })</p>
                
    </div>
</template>
<script setup>
import axios from 'axios';
import { ref } from 'vue';
const count = ref(null)
const error = ref(null)

const getBookCount = async () => {
  try{
      const response = await axios.get('https://countbooks-zq4wg47vrq-uc.a.run.app')
      count.value = response.data.count;
      error.value = null;
  }
   catch(err){
    console.log("Error getting book count:", err);
    error.value = err;
    count.value = null;
   }
}
</script>