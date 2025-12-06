<template>
    <div class="container">
        <h1>SubscriptionsList Management System</h1>

        <SubscriptionsList />
    </div>
</template>

<script setup lang="ts">
import SubscriptionsList from '@/components/SubscriptionsList.vue';
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