import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { usesUsersStore } from "@/stores/users";

const protectedRoutes = ['/subscriptions', '/'];
const forbiddenForAuthUsers = ['/login', '/register'];


export const authGuard = async (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
): Promise<void> => {
    const usersStore = usesUsersStore();

    const isAuthenticated = await usersStore.checkAuth();

    if (isAuthenticated && forbiddenForAuthUsers.includes(to.path)) return next('/');

    if (protectedRoutes.includes(to.path)) {
        if (!isAuthenticated) {
            return next('/login');
        }
    }

    return next();
}