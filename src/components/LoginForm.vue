<template>
    <v-form @submit.prevent="handleSubmit" ref="form">
        <v-text-field v-model="email" label="Email" type="email" required
            :rules="[v => !!v || 'Обязательно к заполнению', v => /.+@.+\..+/.test(v) || 'Valid email required']"
            class="mb-3" />

        <v-text-field v-model="password" label="Пароль" :type="showPassword ? 'text' : 'password'" required
            :rules="[v => !!v || 'Обязательно к заполнению']" class="mb-3"
            :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append-inner="showPassword = !showPassword" />

        <v-btn type="submit" color="primary" block :loading="loading">
            Войти
        </v-btn>
        <v-btn @click="to_register_page" variant="text" color="info">
            Регистрация
        </v-btn>
    </v-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { VForm } from 'vuetify/components'
import { useRouter } from 'vue-router'
import { usesUsersStore } from '@/stores/users'

const router = useRouter();
const usersStore = usesUsersStore();

// Refs
const form = ref<VForm | null>(null)
const email = ref('')
const password = ref('')
const loading = ref(false)
const showPassword = ref(false)

// Emits
const emit = defineEmits<{
    submit: [data: { email: string, password: string }]
}>()

// Handle form submission
const handleSubmit = async () => {
    if (!form.value) return

    const { valid } = await form.value.validate()

    if (valid) {
        loading.value = true

        // Send form data to parent
        emit('submit', {
            email: email.value,
            password: password.value
        })
        try {
            const authData = await usersStore.authUser({
                username: email.value,
                password: password.value,
                grant_type: 'password',
                scope: ''
            })

            router.push('/');
        } catch (error) {
            console.error('Failed to auth user:', error);
        } finally {
            loading.value = false;
        }


    }
}

// Method to get form data  
const getFormData = () => ({
    email: email.value,
    password: password.value,
})

// Method to reset form
const resetForm = () => {
    if (form.value) {
        form.value.reset()
    }
    email.value = ''
    password.value = ''
}

// Expose methods to parent
defineExpose({
    getFormData,
    resetForm
})

const to_register_page = () => {
    router.push('/register')
}   
</script>