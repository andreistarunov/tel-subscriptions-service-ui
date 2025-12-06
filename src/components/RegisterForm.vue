<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label for="name">Name:</label>
      <input
        id="name"
        v-model="form.name"
        type="text"
        required
      />
    </div>
    <div>
      <label for="login">Email:</label>
      <input
        id="login"
        v-model="form.login"
        type="email"
        required
      />
    </div>
    <div>
      <label for="password">Password:</label>
      <input
        id="pawword"
        v-model="form.password"
        type="password"
        required
      />
    </div>
    <button type="submit" :disabled="submitting">
      {{ submitting ? 'Adding...' : 'Add User' }}
    </button>
  </form>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { usesUsersStore } from '@/stores/users';

  const usersStore = usesUsersStore();
  const submitting = ref(false);

  const form = ref({
    name: '',
    login: '',
    password: '',
  });

  const handleSubmit = async () => {
    if (!form.value.name || !form.value.login || !form.value.password) return;

    submitting.value = true;
    try {
      await usersStore.registerUser({
        name: form.value.name,
        login: form.value.login,
        password: form.value.password,
      });
      // Очищаем форму после успешного добавления
      form.value.name = '';
      form.value.login = '';
    } catch (error) {
      console.error('Failed to add user:', error);
    } finally {
      submitting.value = false;
    }
  };
</script>

<style scoped>
form {
  margin: 20px 0;
}

div {
  margin-bottom: 10px;
}

label {
  display: inline-block;
  width: 60px;
}

input {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

button {
  padding: 8px 16px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style>