import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { authGuard } from './guard'
import { usesUsersStore } from '@/stores/users';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/RegisterView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
    },
    {
      path: '/services',
      name: 'services',
      component: () => import('@/views/SubscriptionsView.vue'),
    },
  ],
})

router.beforeEach(authGuard);

router.isReady().then(async () => {
  const authStore = usesUsersStore()
  await authStore.checkAuth()
});

export default router
