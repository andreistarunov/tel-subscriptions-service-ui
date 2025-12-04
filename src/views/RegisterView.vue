<template>
  <div class="container">
    <h1>Auth</h1>
    
    <RegisterForm />
  </div>
</template>

<script setup lang="ts">
import RegisterForm from '@/components/RegisterForm.vue';
</script>

<style>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  color: #333;
  text-align: center;
}
</style>