import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type { CreateUserRequest, AuthUserResponse, AuthUserRequest } from "@/types/api"
import { ApiService } from "@/services/api";

export const usesUsersStore = defineStore('users', () => {
    // Statement
    const token = ref<string | null>(null);
    const loading = ref(false);
    const error = ref<string | null>(null);

    // Getters
    const isUserAuthenticated = computed(() => !!token);

    // Actions
    const registerUser = async (userData: CreateUserRequest) => {
        loading.value = true;
        error.value = null;

        try {
            const newUser = await ApiService.registerUser(userData);

            return newUser;
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'An error occured';
        } finally {
            loading.value = false;
        };
    };

    const authUser = async (authData: AuthUserRequest) => {
        loading.value = true;
        error.value = null;

        const authResponse = await ApiService.authUser(authData);
        setToken(authResponse.access_token);

        return authResponse;
    };

    const checkAuth = async (): Promise<boolean> => {
        if (!isAuthenticated()) {
            return false;
        }

        token.value = getToken();

        return true;
    }


    const isAuthenticated = (): boolean => {
        return !!getToken();
    }

    const setToken = (accessToken: string): void => {
        localStorage.setItem('ACCESS_TOKEN', accessToken);
    }

    const clearToken = (): void => {
        localStorage.removeItem('ACCESS_TOKEN');
    }

    const getToken = (): string | null => {
        return localStorage.getItem('ACCESS_TOKEN')
    }

    const logout = (): void => {
        clearToken()
    }

    return {
        loading,
        error,
        token,
        isAuthenticated,
        registerUser,
        authUser,
        checkAuth,
        logout
    };
});