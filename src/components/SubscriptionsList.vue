<template>
  <div>
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else>
      <h2>Subs List</h2>
      <ul>
        <li v-for="sub in subscriptions" :key="sub.title">
          {{ sub.title }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSubscriptionStore } from '@/stores/subscriptions';
import { storeToRefs } from 'pinia';

const subsStore = useSubscriptionStore();
const { subscriptions, loading, error } = storeToRefs(subsStore);

subsStore.fetchSubscriptions('11e17f85-33f4-4802-849f-2c32fd9d4af2');
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