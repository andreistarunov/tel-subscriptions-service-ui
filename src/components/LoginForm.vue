<template>
    <form @submit.prevent="authFormSubmit" class="auth-form">
        <div class="form-group">
            <label for="login">Email</label>
            <input id="login" v-model="form.login" type="email" class="input" required />
        </div>

        <div class="form-group">
            <label for="password">Password</label>
            <input id="password" v-model="form.password" type="password" class="input" required />
        </div>

        <button type="submit" class="submit-btn" :disabled="submitting">
            {{ submitting ? 'Authenticating…' : 'Login' }}
        </button>
    </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { usesUsersStore } from '@/stores/users';

const usersStore = usesUsersStore();
const submitting = ref(false);

const form = ref({
    login: '',
    password: '',
});

const authFormSubmit = async () => {
    submitting.value = true;

    await usersStore.authUser({
        username: form.value.login,
        password: form.value.password,
        grant_type: 'password',
        scope: ''
    });

    submitting.value = false;
};
</script>

<style scoped>
.auth-form {
    width: 100%;
    max-width: 100%;
    margin: 0;
    padding: 40px;
    background: #fff;
    border-radius: 0;
    box-shadow: none;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

label {
    font-weight: 600;
    font-size: 14px;
    color: #333;
}

.input {
    padding: 10px 12px;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    font-size: 14px;
    transition: border-color 0.2s;
}

.input:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

.submit-btn {
    padding: 10px 16px;
    background: #3b82f6;
    color: #fff;
    border: none;
    border-radius: 8px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
}

.submit-btn:hover:not(:disabled) {
    background: #2563eb;
}

.submit-btn:disabled {
    background: #9ca3af;
    cursor: not-allowed;
}

/* Mobile adjustments */
@media (max-width: 480px) {
    .auth-form {
        padding: 16px;
    }

    .submit-btn {
        width: 100%;
    }
}
</style>
