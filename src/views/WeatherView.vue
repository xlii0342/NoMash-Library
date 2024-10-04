<template>
    <div class="row mt-5 about">
      <div class="col-md-8 offset-md-2">
        <h1 class="text-center">Current Weather</h1>
        <div class="container">
          <div class="header">
            <h1>WEATHER APP</h1>
            <div class="search-bar">
              <input type="text" v-model="city" placeholder="Enter city name" class="search-input" />
              <button @click="searchByCity" class="search-button">Search</button>
            </div>
          </div>
          <div v-if="weatherData">
            <h2>{{ weatherData.name }}, {{ weatherData.sys.country }}</h2>
            <div>
              <img :src="iconUrl" alt="Weather Icon" />
              <p>{{ temperature }} °C</p>
            </div>
            <span>{{ weatherData.weather[0].description }}</span>
          </div>
          <div v-else-if="loading">
            <p>Loading weather data...</p>
          </div>
          <div v-else-if="error">
            <p>Error fetching weather data: {{ error }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'  
  import axios from 'axios'
  
  const city = ref('')
  const weatherData = ref(null)
  const loading = ref(false)
  const error = ref(null)
  
  const apiKey = '4821635646567995fe1bf523624b0e41'
  

  const searchByCity = async () => {
    if (!city.value) {
      alert('Please enter a city name')
      return
    }
  
    loading.value = true
    error.value = null
    weatherData.value = null
  
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric` // 注意使用单位为 metric 以直接返回摄氏温度
  
    try {
      const response = await axios.get(url)
      weatherData.value = response.data
    } catch (err) {
      error.value = 'Could not fetch weather data. Please try again later.'
      console.error(err)
    } finally {
      loading.value = false
    }
  }
  

  const fetchCurrentLocationWeather = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
        await fetchWeatherData(url)
      }, (err) => {
        error.value = 'Unable to retrieve your location'
        console.error(err)
      })
    } else {
      error.value = 'Geolocation is not supported by this browser.'
    }
  }
  

  const fetchWeatherData = async (url) => {
    loading.value = true
    error.value = null
    weatherData.value = null
  
    try {
      const response = await axios.get(url)
      weatherData.value = response.data
    } catch (err) {
      error.value = 'Error fetching weather data.'
      console.error(err)
    } finally {
      loading.value = false
    }
  }
  

  const temperature = computed(() => {
    return weatherData.value ? Math.floor(weatherData.value.main.temp) : null
  })
  
  const iconUrl = computed(() => {
    return weatherData.value ? `http://openweathermap.org/img/wn/${weatherData.value.weather[0].icon}@2x.png` : null
  })
  

  onMounted(() => {
    fetchCurrentLocationWeather()
  })
  </script>
  
  <style>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 20vh; 
    flex-direction: column; 
  }
  
  .header {
    text-align: center;
  }
  
  .search-bar {
    display: flex;
    justify-content: center;
    margin-bottom: 20px; 
  }
  
  .search-input {
    margin-right: 10px; 
    padding: 5px;
    font-size: 16px;
  }
  
  .search-button {
    padding: 5px 15px;
    font-size: 16px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  .search-button:hover {
    background-color: #0056b3;
  }
  
  p {
    font-size: 18px;
  }
  
  img {
    width: 100px;
    height: 100px;
  }
  </style>
  