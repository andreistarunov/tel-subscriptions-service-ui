import { defineStore } from "pinia";
import { ref } from "vue";
import type { Subscription, CreateSubscriptionRequest, RemoveSubscriptionRequest } from "@/types/api";
import { ApiService } from "@/services/api";

export const useSubscriptionStore = defineStore('subscriptions', () => {
    const subscriptions = ref<Subscription[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);

    const fetchSubscriptions = async (userId: string) => {
        loading.value = true;
        error.value = null;

        try {
            subscriptions.value = await ApiService.getSubscriptionsByUser(userId);
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'An error occured';
        } finally {
            loading.value = false;
        };

    };

    const createSubscription = async (subsData: CreateSubscriptionRequest) => {
        loading.value = true;
        error.value = null;

        try {
            const newSubscription = await ApiService.createSubscription(subsData);
            subscriptions.value.push(newSubscription);

            return newSubscription;
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'An error occured';
        } finally {
            loading.value = false;
        };
    }

    return {
        subscriptions,
        loading,
        error,
        fetchSubscriptions,
        createSubscription
    };
});