<template>
    <v-card class="mt-6">
        <v-card-title>
            Создать услугу
        </v-card-title>
        <v-card-text>
            <v-form @submit.prevent="handleSubmit" ref="form">
                <v-text-field v-model="title" label="Название" type="text" required
                    :rules="[v => !!v || 'Обязательно к заполнению']" class="mb-3" />

                <v-text-field v-model="description" label="Описание" type="text" required
                    :rules="[v => !!v || 'Обязательно к заполнению']" class="mb-3" />

                <v-text-field v-model.number="price" label="Цена" type="number" required
                    :rules="[v => !!v || 'Обязательно к заполнению', v => v > 0 || 'Цена должна быть больше 0']"
                    class="mb-3" />

                <v-text-field v-model.number="days" label="Срок действия (дней)" type="number" required
                    :rules="[v => !!v || 'Обязательно к заполнению', v => v > 0 || 'Количество дней должно быть больше 0']"
                    class="mb-3" />

                <v-btn type="submit" color="primary" block :loading="submitting">
                    Создать подписку
                </v-btn>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { VForm } from 'vuetify/components';
import { useSubscriptionStore } from '@/stores/subscriptions';

const subsStore = useSubscriptionStore();
const form = ref<VForm | null>(null);
const title = ref('');
const description = ref('');
const price = ref<number | null>(null);
const days = ref<number | null>(null);
const sellerId = ref('');
const submitting = ref(false);

const handleSubmit = async () => {
    if (!form.value) return;

    const { valid } = await form.value.validate();

    if (valid && price.value !== null && days.value !== null) {
        submitting.value = true;
        try {
            await subsStore.createSubscription({
                title: title.value,
                description: description.value,
                price: price.value,
                days: days.value,
                seller_id: sellerId.value,
            });
            // Clear form after successful creation
            if (form.value) {
                form.value.reset();
            }
            title.value = '';
            description.value = '';
            price.value = null;
            days.value = null;
            sellerId.value = '';
        } catch (error) {
            console.error('Failed to create subscription:', error);
        } finally {
            submitting.value = false;
        }
    }
};
</script>
