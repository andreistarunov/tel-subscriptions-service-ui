<template>
  <v-container class="d-flex justify-center align-center">
    <v-card width="400" class="pa-6">
      <h2 class="text-center mb-6">Регистрация</h2>

      <RegisterForm />
    </v-card>
  </v-container>
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