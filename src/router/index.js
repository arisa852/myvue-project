import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../pages/HomeView.vue'
import StyleView from '../pages/StyleView.vue'
import FoodView from '@/pages/FoodView.vue'
import CollectView from '@/pages/CollectView.vue'
import { useAuthStore } from '@/stores/useAuthStore'
import { useUiStore } from '@/stores/useUiStore'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  { path: '/home', redirect: { name: 'home' } },
  {
    path: '/style',
    name: 'style',
    component: StyleView,
  },
  {
    path: '/food',
    name: 'food',
    component: FoodView,
  },
  {
    path: '/collect',
    name: 'collect',
    component: CollectView,
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to) => {
  if (to.meta.requiresAuth !== true) return true

  const auth = useAuthStore()
  const ui = useUiStore()

  if (!auth.isLoggedIn) {
    ui.openLoginModal()
    return false
  }
  return true
})

export default router
