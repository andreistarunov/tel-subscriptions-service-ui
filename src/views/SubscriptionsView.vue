<template>
    <div class="container pa-8">
        <h1>Мои услуги</h1>

        <CreateSubscriptionForm class="mb-6" />
        <SubscriptionsList />
    </div>
</template>

<script setup lang="ts">
import SubscriptionsList from '@/components/SubscriptionsList.vue';
import CreateSubscriptionForm from '@/components/CreateSubscriptionForm.vue';
</script>

<style>
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
}

h1 {
    color: #333;
    text-align: center;
    margin-bottom: 30px;
}
</style>