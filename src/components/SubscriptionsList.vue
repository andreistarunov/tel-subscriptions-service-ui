<template>
  <div v-if="loading" class="loading">Загрузка...</div>
  <div v-else-if="error" class="error">{{ error }}</div>
  <div v-else>
    <div v-for="sub in subscriptions" :key="sub.id">

      <v-card :title="sub.title" :subtitle="sub.description" :text="sub.price" min-width="400px" class="mb-10">
        <v-card-actions>
          <v-btn>Click me</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSubscriptionStore } from '@/stores/subscriptions';
import { storeToRefs } from 'pinia';

const subsStore = useSubscriptionStore();
const { subscriptions, loading, error } = storeToRefs(subsStore);

subsStore.fetchSubscriptions();

console.log('subscriptions = ', subscriptions.value);
</script>

<style scoped>
.loading {
  color: #666;
}

.error {
  color: red;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 8px;
  border-bottom: 1px solid #eee;
}
</style>