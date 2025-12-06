import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { usesUsersStore } from "@/stores/users";

const publicRoutes = ['/login', '/register'];
const guestOnlyRoutes = ['/login', '/register'];
const protectedRoutes = ['/subscriptions'];


export const authGuard = async (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
): Promise<void> => {
    const usersStore = usesUsersStore();

    const isAuthenticated = await usersStore.checkAuth();

    console.log(isAuthenticated);
    console.log(to.path);

    if (protectedRoutes.includes(to.path)) {
        if (!isAuthenticated) {
            // console.log("Not auth")
            return next('/login');
        }
    }

    return next();
}