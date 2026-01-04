<template>
  <div class="form-container mt-6">
    <v-form @submit.prevent="handleSubmit" ref="form">
      <v-text-field v-model="name" label="Имя" type="text" required :rules="[v => !!v || 'Обязательно к заполнению']"
        class="mb-3" />

      <v-text-field v-model="login" label="E-mail" type="email" required
        :rules="[v => !!v || 'Обязательно к заполнению', v => /.+@.+\..+/.test(v) || 'Valid email required']"
        class="mb-3" />

      <v-text-field v-model="password" label="Пароль" :type="showPassword ? 'text' : 'password'" required
        :rules="[v => !!v || 'Обязательно к заполнению']" class="mb-3"
        :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
        @click:append-inner="showPassword = !showPassword" />

      <v-btn type="submit" color="primary" block :loading="submitting">
        Регистрация
      </v-btn>
      <v-btn @click="to_login_page" variant="text" color="info">
        Войти
      </v-btn>
    </v-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { VForm } from 'vuetify/components';
import { usesUsersStore } from '@/stores/users';
import { useRouter } from 'vue-router'

const router = useRouter();

const usersStore = usesUsersStore();
const form = ref<VForm | null>(null);
const name = ref('');
const login = ref('');
const password = ref('');
const submitting = ref(false);
const showPassword = ref(false);

const handleSubmit = async () => {
  if (!form.value) return;

  const { valid } = await form.value.validate();

  if (valid) {
    submitting.value = true;
    try {
      let newUser = await usersStore.registerUser({
        name: name.value,
        login: login.value, // Map email to login for API
        password: password.value,
      });
      // Clear form after successful registration
      if (form.value) {
        form.value.reset();
      }

      name.value = '';
      login.value = '';
      password.value = '';

      to_login_page()
    } catch (error) {
      console.error('Failed to register user:', error);
    } finally {
      submitting.value = false;
    }
  }
};

const to_login_page = () => {
  router.push('/login');
}
</script>

<style scoped>
.form-container {
  width: 25%;
  min-width: 300px;
  margin: 0 auto;
}
</style>
