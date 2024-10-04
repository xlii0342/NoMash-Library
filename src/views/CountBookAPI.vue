<template>
    <pre>{{ count  }}</pre>
</template>
<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
const count = ref(null)
const error = ref(null)

const getBookCount = async () => {
  try{
      const response = await axios.get('https://countbooks-zq4wg47vrq-uc.a.run.app')
      count.value = response.data;
      error.value = null;
  }
   catch(err){
    console.log("Error getting book count:", err);
    error.value = err;
    count.value = null;
   }
}
onMounted(() => {
    getBookCount();
})
</script>