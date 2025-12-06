<template>
  <div id="app">
    <nav v-if="$route.path !== '/login'">
      <router-link to="/">Home</router-link>
      <router-link to="/subscriptions">Subscriptions</router-link>
      <button v-if="isLoggedIn" @click="logout">Logout</button>
      <router-link v-else to="/login">Login</router-link>
    </nav>

    <router-view />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const isLoggedIn = computed(() => {
  return !!localStorage.getItem('ACCESS_TOKEN')
})

const logout = () => {
  localStorage.removeItem('ACCESS_TOKEN')
  router.push('/login')
}
</script>

<style>
#app {
  width: 100%;
  max-width: 100%;
  font-family: Arial, sans-serif;
}

nav {
  padding: 20px;
  background: #f8f9fa;
  border-bottom: 1px solid #ddd;
}

nav a,
nav button {
  /* margin-right: 15px; */
  text-decoration: none;
  color: #333;
  background: none;
  border: 1px solid #ddd;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}

nav a:hover,
nav button:hover {
  background: #e9ecef;
}

nav a.router-link-active {
  background: #007bff;
  color: white;
  border-color: #007bff;
}
</style>