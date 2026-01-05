<template>
  <v-container class="d-flex justify-center align-center">
    <v-card width="400" class="pa-6">
      <h2 class="text-center mb-6">Авторизация</h2>

      <LoginForm @submit="handleLogin" />
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import LoginForm from '@/components/LoginForm.vue';
import { usesUsersStore } from '@/stores/users';

const store = usesUsersStore();
const handleLogin = async (formData) => {

  const authData = await store.authUser({
    username: formData.email,
    password: formData.password,
    grant_type: 'password',
    scope: ''
  });

  const isAuth = store.isAuthenticated();

  console.log('isAuth = ', isAuth);
}
</script>